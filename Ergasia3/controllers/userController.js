//---------------------IMPORTS---------------
const User = require("../models/userModel.js");


//παιρνω την ηλικια και προχωραω μονο αν ειναι μεγαλυτερος απο 18
const checkAge = async (req, res, next) => {
  const age = req.body.age;
  if (age < 18) {
    return res.status(400).json({ message: "Age must be greater than 18" });
  }
  next();
};

//παιρνω το email και ψαχνω για ιδιο, αν δεν βρω προχωραω
const checkDuplicateEmail = async (req, res, next) => {
  //toLowerCase ωστε να μην ειναι case-sensitive
  const email = req.body.email.toLowerCase();
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //κανω το email στο request lowercase για να σωθει στην βαση
    req.body.email = email;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//---------------------CONTROLLERS---------------

//χρησιμοποιησα seachParams αντι για params, με βολεψε αργοτερα που θελω να ψαχνω
//με πολλα στοιχεια ταυτοχρονα
const getUsersByEmail = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;

    const email = searchParams.get("email").toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email parameter is missing" });
    }
    //κραταω μονο το name
    const user = await User.findOne({ email: email }, { _id: 0, name: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, name: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//κανω απευθειας register καθως εχουν γινει οι ελεγχοι και η
//μετατροπη του email σε lowerCase στα 2 προηγουμενα middleware
const registerNewUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    //ψαχνω user με το lowercase email που εδωσα
    const email = req.query.email.toLowerCase();
    const updates = req.body;
    //αν εδωσα email που δεν ειναι lowercase το μετατρεπω
    updates.email = updates.email.toLowerCase();
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.query.email.toLowerCase();
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//---------------------EXPORTS---------------
module.exports = {
  checkAge,
  checkDuplicateEmail,
  getUsersByEmail,
  getAllUsers,
  registerNewUser,
  updateUser,
  deleteUser,
};
