import Register from "../models/Registration.js";
import bcrypt from "bcryptjs";

// STEP 1 → VERIFY EMAIL (Forgot Password)
export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await Register.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Email found → proceed to next step
    return res.status(200).json({
      message: "Email verified. Proceed to set new password.",
      email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while verifying email",
      error: error.message,
    });
  }
};

// STEP 2 → UPDATE PASSWORD
export const setNewPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email missing in request" });
    }

    // Password match check
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user
    const user = await Register.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found for this email" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in DB
    user.Password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while setting new password",
      error: error.message,
    });
  }
};
