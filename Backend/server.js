const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/budgets", require("./Routes/budgetRoutes.js"));

app.listen(5000, () =>{console.log("Server running on port 5000")});
