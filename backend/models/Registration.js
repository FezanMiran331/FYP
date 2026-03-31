// models/Registration.js
// Registration (models)
import mongoose from "mongoose";

const Registration_Schema = new mongoose.Schema({
  Firstname: { type: String, required: true },
  Secondname: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phonenumber: { type: String, required: true },
  Usertype: { type: String, required: true, enum: ["Student", "Teacher"] },
  DOB: { type: Date, required: true },
  Password: { type: String, required: true },
  Con_Password: { type: String, required: true },
}, { timestamps: true });

const Register = mongoose.models.Registration || mongoose.model("Registration", Registration_Schema);
export default Register;
 