import mongoose ,{Schema} from "mongoose";

const bookingSchema = new Schema({
  userId: String,
  userName: String,
  apartment: String,
  facility: String,
  date: String,
  timeSlot: String,
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.model('Booking', bookingSchema);
