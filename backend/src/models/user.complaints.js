import mongoose, {Schema} from "mongoose";

const complaintSchema = new Schema({
  userId: String,
  userName: String,
  apartment: String,
  category: String,
  title: String,
  description: String,
  priority: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  adminNotes: String,
  images: [String],
});

export const Complaint = mongoose.model('Complaint', complaintSchema);