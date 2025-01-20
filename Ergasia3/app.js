//-----------------MODULES---------------------
const express = require("express");
const bodyParser = require("body-parser");
const poiRoute = require("./routes/poiRoutes.js");
const userRoute = require("./routes/userRoutes.js");

const app = express();

//---------------------MIDDLEWARES----------------
app.use(bodyParser.json());

//---------------------ROUTES----------------
app.use("/api/v1/pois", poiRoute);
app.use("/api/v1/users", userRoute);

//---------------------EXPORTS----------------
module.exports = app;