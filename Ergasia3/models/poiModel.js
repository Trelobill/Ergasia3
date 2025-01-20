const mongoose = require("mongoose");

//φτιαχνω το schema, κανω υποχρεωτικα οτι πρεπει
//δεν καταλαβα ακριβως αν πρεπει να ειναι ολα αυτα υποχρεωτικα, εγω τα εκανα
const poiSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    category: { type: String, required: [true, "Category is required"] },
    address: { type: String, required: [true, "Address is required"] },
    coordinates: { type: String, required: [true, "Coordinates is required"] },
    photo: String,
  });
  
//δημιουργω το μοντελο
const Poi = mongoose.model("POI", poiSchema);

//κανω export το μοντελο
module.exports = Poi;