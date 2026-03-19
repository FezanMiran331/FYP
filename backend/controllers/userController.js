// controllers/userController.js
import User from "../models/Registration.js";

export const getProfile = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ Email: email.trim() });  console.log(user,email)
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { Email, ...updateData } = req.body;
    
 
    const updatedUser = await User.findOneAndUpdate(
      { Email: Email },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};