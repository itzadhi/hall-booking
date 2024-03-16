import express from 'express';
import {
  createRoom,
  bookARoom,
  getAllBooking,
} from '../controllers/hallBookingController.js';

const router = express.Router();

router.route('/create').post(createRoom);

router.route('/booking').post(bookARoom);

router.route('/details').get(getAllBooking);

// router
//   .route('/customers').get();

// router.route('/')

export default router;
