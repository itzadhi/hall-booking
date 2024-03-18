import Room from '../models/RoomModel.js';
import Booking from '../models/BookingModel.js';

// @desc    Create a room
// @route   POST /room/create
// @access  Public
const createRoom = async (req, res) => {
  try {
    const { body } = req;
    await Room.collection.insertOne(body);
    res.status(201).send(body);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

// @desc    Book a room
// @route   POST /room/booking
// @access  Public
const bookARoom = async (req, res) => {
  const { body } = req;
  //Get the date from body to check the room is available
  const bookingStartTime = new Date(
    body?.bookingFromDate + ' ' + body?.startTime
  );
  try {
    const getRoomId = await Room.findOne({ roomName: body?.roomName });
    //To check whether we are giving only the given room names
    //so that we could insert the room id in the booking document
    if (!getRoomId) {
      res.status(404);
      throw new Error('Please enter the correct room name');
    }

    const roomsAvailability = await Booking.findOne({
      roomId: getRoomId?._id,
    });

    //To check whether the selected room is available with our booking data
    if (roomsAvailability) {
      const bookedEndTime = new Date(
        roomsAvailability?.bookingToDate + ' ' + roomsAvailability?.endTime
      );
      if (bookingStartTime <= bookedEndTime) {
        res.status(409);
        throw new Error(
          'In the selected date, the selected room has been booked already'
        );
      }
    }

    const reqBody = { roomId: getRoomId?._id, ...body };
    await Booking.collection.insertOne(reqBody);
    res.status(201).send(reqBody);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

// @desc    Get all booking details
// @route   GET /room/booking/details
// @access  Public
const getAllBooking = async (req, res) => {
  try {
    //Getting all booking date from Booking Collection
    const getBookingData = await Booking.find({});
    res.status(200).send(getBookingData);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

// @desc    Get all customer details
// @route   GET /room/customers
// @access  Public
const getAllCustomerDetails = async (req, res) => {
  try {
    //Getting all customers from Booking Collection
    const getBookingData = await Booking.find({});
    const responseData = getBookingData.map((data) => {
      return {
        customerName: data?.customerName,
        roomName: data?.roomName,
        bookingDate: data?.bookingFromDate,
        startTime: data?.startTime,
        endTime: data?.endTime,
      };
    });
    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

// @desc    Get all customer details with their booking history
// @route   GET /room/customer/details
// @access  Public
const getCustomerDetails = async (req, res) => {
  try {
    const getBookingData = await Booking.find({});
    const responseData = [];
    getBookingData.forEach((customer) => {
      const customerData = [];
      const userExists = responseData?.find(
        (user) => user?.customerName === customer?.customerName
      );
      if (userExists) {
        return;
      } else {
        getBookingData.filter((item) => {
          if (item?.customerName === customer?.customerName) {
            customerData.push({
              roomName: item?.roomName,
              bookingId: item?._id,
              bookingFromDate: item?.bookingFromDate,
              bookingToDate: item?.bookingToDate,
              startTime: item?.startTime,
              endTime: item?.endTime,
              status: item?.status,
            });
            return item;
          }
        });

        responseData.push({
          customerName: customer?.customerName,
          bookingCount: customerData?.length,
          bookingDetails: customerData,
        });
      }
    });
    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

export {
  createRoom,
  bookARoom,
  getAllBooking,
  getAllCustomerDetails,
  getCustomerDetails,
};
