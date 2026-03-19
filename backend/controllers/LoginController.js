import Register from "../models/Registration.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await Register.findOne({ Email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      userId: user._id,
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
