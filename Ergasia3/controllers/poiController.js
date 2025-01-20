//---------------------IMPORTS---------------
const Poi = require("../models/poiModel.js");

//---------------------MIDDLEWARES---------------

//δεν επιτρεπεται ηδη απο το μοντελο να ειναι κενα αλλα κανουμε εξτρα ελεγχο
//και επιστρεφουμε μηνυμα και status (θα μπορουσε να εκτυπωνει στην σελιδα ας πουμε)
const validatePoi = async (req, res, next) => {
  const { name, category, address, coordinates } = req.body;

  if (!name || !category || !address || !coordinates) {
    return res
      .status(400)
      .json({ message: "Name, category, and address are required" });
  }
  next();
};

//---------------------CONTROLLERS---------------
const getPoisByParameters = async (req, res) => {
  try {
    //με το searchParams μπορω να ψαξω για παραπανω απο 1 πεδια μαζι ευκολα
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;

    //βρισκω ποιοι παραμετροι εχουν δοθει και βρισκω το τελικο query
    const query = {};
    if (searchParams.has("name")) {
      query.name = new RegExp(searchParams.get("name"), "i");
    }
    if (searchParams.has("category")) {
      query.category = new RegExp(searchParams.get("category"), "i");
    }
    if (searchParams.has("address")) {
      query.address = new RegExp(searchParams.get("address"), "i");
    }
    if (searchParams.has("coordinates")) {
      query.coordinates = new RegExp(searchParams.get("coordinates"), "i");
    }

    const pois = await Poi.find(query);
    res.status(200).json(pois);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllPois = async (req, res) => {
  try {
    const pois = await Poi.find();
    res.status(200).json(pois);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//κανω απευθειας create καθως εχω κανει ηδη validate στο middleware
const createNewPoi = async (req, res) => {
  try {
    const poi = await Poi.create(req.body);
    await poi.save();
    res.status(201).json({ message: "POI added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePoi = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;

    const updatedPoi = await Poi.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!updatedPoi) {
      return res.status(404).json({ message: "POI not found" });
    }
    res.status(200).json({ message: "POI updated successfully", updatedPoi });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePoi = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedPoi = await Poi.findByIdAndDelete(id);
    if (!deletedPoi) {
      return res.status(404).json({ message: "POI not found" });
    }
    res.status(200).json({ message: "POI deleted successfully", deletedPoi });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//---------------------EXPORTS---------------
module.exports = {
  getPoisByParameters,
  getAllPois,
  validatePoi,
  createNewPoi,
  updatePoi,
  deletePoi,
};
