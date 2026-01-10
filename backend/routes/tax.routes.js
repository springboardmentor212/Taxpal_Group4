import express from "express";
import { calculateTax, getHistory } from "../controllers/tax.controller.js";

const router = express.Router();

router.post("/calculate", calculateTax);
router.get("/history", getHistory);

export default router;
