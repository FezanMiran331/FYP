import Register from "../models/Registration.js";
import bcrypt from "bcryptjs";

// Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { Firstname, Secondname, Email, Phonenumber, Usertype, DOB, Password, Con_Password } = req.body;

    // Check if user already exists
    const existingUser = await Register.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Check if passwords match
    if (Password !== Con_Password) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create new user
    const newUser = new Register({
      Firstname,
      Secondname,
      Email,
      Phonenumber,
      Usertype,
      DOB,
      Password: hashedPassword,
      Con_Password: hashedPassword, // store hashed for consistency
    });

    // Save user to DB
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
