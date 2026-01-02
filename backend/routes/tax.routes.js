import express from 'express';
import { calculateTax, getHistory } from '../controllers/tax.controller.js';

const router = express.Router();

// POST route to calculate tax
router.post('/calculate', calculateTax);

// GET route to fetch tax history
router.get('/history', getHistory);

export default router;