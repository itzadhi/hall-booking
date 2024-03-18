import express from 'express';
import {
  createRoom,
  bookARoom,
  getAllBooking,
  getAllCustomerDetails,
  getCustomerDetails,
} from '../controllers/hallBookingController.js';

const router = express.Router();

// @desc    Create a room
router.route('/create').post(createRoom);

// @desc    Book a room
router.route('/booking').post(bookARoom);

// @desc    Get all booking details
router.route('/booking/details').get(getAllBooking);

// @desc    Get all customer details
router.route('/booking/customers').get(getAllCustomerDetails);

// @desc    Get all customer details with their booking history
router.route('/booking/customer/:name').get(getCustomerDetails);

export default router;
