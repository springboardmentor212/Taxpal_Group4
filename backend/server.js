import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import taxRoutes from './routes/tax.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('TaxPal backend is running');
});

// Routes
app.use('/api/tax', taxRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});