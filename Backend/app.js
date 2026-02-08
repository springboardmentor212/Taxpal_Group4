import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github";
import "dotenv/config";
import User from "./models/user.js";
import connectDB from "./config/connection.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=3000;
app.use(
    session({
        secret:"key",
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false}
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  { usernameField: "email" },
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken,profile,done){
        return done(null,profile);
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    done(null,{id});
});
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
app.get("/auth/google/callback",passport.authenticate("google",{
    failureRedirect:"/login",
}),
(req,res)=>{
    res.redirect("http://localhost:5173/dashboard");
});
app.get("/auth/github",passport.authenticate("github"));
app.get("/auth/github/callback",passport.authenticate("github",{
    failureRedirect:"/login",
}),
(req,res)=>{
    res.redirect("http://localhost:5173/dashboard");
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, country, income } = req.body;
    console.log("REQ BODY ", req.body);
    if (!name || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      country,
      income
    });
    await newUser.save();
    res.status(201).json({ success: true });
  } 
  catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info?.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          country: user.country,
          income: user.income,
        },
      });
    });
  })(req, res, next);
});
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is Running on port", PORT);
})