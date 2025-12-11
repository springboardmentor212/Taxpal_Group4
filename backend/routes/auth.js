const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email: email.toLowerCase(), password: hashed });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login (Passport local)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ error: info?.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      // Return user details excluding password
      const { _id, name, email } = user;
      res.json({ message: "Logged in", user: { id: _id, name, email } });
    });
  })(req, res, next);
});

// Logout
router.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => res.json({ message: "Logged out" }));
  });
});

// Check session / get current user
router.get("/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.status(401).json({ user: null });
  const { _id, name, email } = req.user;
  res.json({ user: { id: _id, name, email } });
});

module.exports = router;
