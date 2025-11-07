import express from 'express';
import 'dotenv/config';
import mainRouter from './router/indexRouter'; 
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health-check', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running well!',
    date: new Date().toISOString(),
  });
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});