import { v4 as uuidv4 } from 'uuid';

const rooms = [
  {
    id: 100,
    roomName: 'Deluxe 1',
    seatsAvailable: '2',
    amenities: 'Free internet,Room Service,TV,AC',
    pricePerHour: '200',
  },
  {
    id: 101,
    roomName: 'Deluxe 2',
    seatsAvailable: '2',
    amenities: 'Free internet,Room Service,TV,AC',
    pricePerHour: '200',
  },
  {
    id: 102,
    roomName: 'Deluxe 3',
    seatsAvailable: '2',
    amenities: 'Free internet,Room Service,TV,AC',
    pricePerHour: '200',
  },
];

const bookings = [
  {
    id: 1,
    bookingDate: '2024-03-16',
    startTime: '12:00',
    endTime: '11:30',
    roomId: 102,
    customerName: 'Alan',
    status: 'booked',
  },
];

const createRoom = (req, res) => {
  const id = uuidv4();
  const { body } = req;
  const reqBody = { id: id, ...body };
  rooms.push(reqBody);
  res.json(reqBody);
};

const bookARoom = (req, res) => {
  const id = uuidv4();
  const { body } = req;
  //16/03/2024,
  //Check the room is available in given date
  //Get that roomId in it
  console.log('s', body);
  res.json('hello');
};

const getAllBooking = (req, res) => {
  res.json({});
};

export { createRoom, bookARoom, getAllBooking };
