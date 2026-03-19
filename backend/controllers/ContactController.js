import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ success: true, message: "Message stored successfully" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
