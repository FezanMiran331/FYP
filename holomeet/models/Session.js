import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
  sessionToken: String,
  userId: mongoose.Schema.Types.ObjectId,
  expires: Date
});
export default mongoose.models.Session || mongoose.model("Session", sessionSchema);
