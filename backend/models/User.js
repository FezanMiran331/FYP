
// Models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Firstname: { type: String, required: true },
  Secondname: { type: String, required: true },
  Email: { type: String, required: true, unique: true }, 
  Phonenumber: { type: String, required: true },
  Usertype: { type: String, required: true, enum: ["Student", "Teacher"] },
  DOB: { type: Date, required: true },
  Password: { type: String, required: true },
  Con_Password: { type: String, required: true },
  Department: { type: String, default: "" },
  EmployeeID: { type: String, default: "" },
  OfficeLocation: { type: String, default: "" },
  Designation: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("users", UserSchema);