// controllers/userController.js
import User from '../Models/Registration.js';

export const getProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userEmail = req.body.Email;

    const updateData = {
      Firstname: req.body.Firstname,
      Secondname: req.body.Secondname,
      Department: req.body.Department,
      EmployeeID: req.body.EmployeeID,
      Phonenumber: req.body.Phonenumber,
      OfficeLocation: req.body.OfficeLocation,
    };

    const updatedUser = await User.findOneAndUpdate(
      { Email: userEmail },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
};