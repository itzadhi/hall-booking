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
    const responseData = [];
    getBookingData.forEach((customer) => {
      const customerData = [];
      //Checking not to fetch again same user details
      const userDetailExists = responseData?.find(
        (user) => user?.customerName === customer?.customerName
      );
      if (userDetailExists) {
        return;
      } else {
        getBookingData.filter((item) => {
          if (item?.customerName === customer?.customerName) {
            customerData.push({
              roomName: item?.roomName,
              bookingFromDate: item?.bookingFromDate,
              bookingToDate: item?.bookingToDate,
              startTime: item?.startTime,
              endTime: item?.endTime,
            });
            return item;
          }
        });

        responseData.push({
          customerName: customer?.customerName,
          bookingDetails: customerData,
        });
      }
    });
    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

// @desc    Get all customer details with their booking history
// @route   GET /room/customer/:name
// @access  Public
const getCustomerDetails = async (req, res) => {
  try {
    const { name } = req.params;
    const getBookingData = await Booking.find({ customerName: name });
    if (getBookingData?.length === 0) {
      res.status(404);
      throw new Error('The user has no booking details');
    }
    const responseData = getBookingData.map((customer) => {
      const customerData = {
        roomName: customer?.roomName,
        bookingId: customer?._id,
        bookingFromDate: customer?.bookingFromDate,
        bookingToDate: customer?.bookingToDate,
        startTime: customer?.startTime,
        endTime: customer?.endTime,
        status: customer?.status,
      };

      return customerData;
    });
    const customerDeatils = [
      {
        customerName: name,
        bookingCount: getBookingData?.length,
        bookingDetails: responseData,
      },
    ];
    res.status(200).send(customerDeatils);
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
