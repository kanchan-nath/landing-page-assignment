import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';


const app = express();
const PORT = process.env.PORT || 4000;

// connectDB();
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.options('*', cors());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Landing Page API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
export default app;