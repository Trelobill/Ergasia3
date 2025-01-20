const mongoose = require("mongoose");

//φτιαχνω το schema, κανω υποχρεωτικα οτι πρεπει
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"] },
});

//δημιουργω το μοντελο
const User = mongoose.model("User", userSchema);

//κανω export το μοντελο
module.exports = User;
