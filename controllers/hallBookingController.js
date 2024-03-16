import { v4 as uuidv4 } from 'uuid';
import Room from '../models/RoomModel.js';
import Booking from '../models/BookingModel.js';

const createRoom = (req, res) => {
  const id = uuidv4();
  const { body } = req;
  const reqBody = { id: id, ...body };
  // rooms.push(reqBody);
  res.json(reqBody);
};

const bookARoom = async (req, res) => {
  const id = uuidv4();
  const { body } = req;
  //Check the room is available in given date
  //Get that roomId in it
  // const startTime = new Date(body?.bookingDate);
  // startTime.setUTCHours(12, 0, 0, 0);
  // const endTime = new Date(body?.bookingDate);
  // endTime.setUTCHours(11, 30, 0, 0);
  const result = await Booking.find({});
  console.log('a', result);
  res.json('hello');
};

const getAllBooking = (req, res) => {
  res.json({});
};

export { createRoom, bookARoom, getAllBooking };
