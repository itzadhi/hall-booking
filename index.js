import express from 'express';
import dotenv from 'dotenv';
import hallBookingRoutes from './routes/hallBookingRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hall Booking API is running....');
});

app.use('/room', hallBookingRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
