import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
    },
    seatsAvailable: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
