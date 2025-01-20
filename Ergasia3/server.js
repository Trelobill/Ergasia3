//-----------------MODULES---------------------
const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config({path: './CONFIG.ENV'});
const db_name = process.env.DB_NAME;
const password = process.env.MONGO_DB_PASSWORD;
const port = process.env.PORT;

//-----------------MONGODB---------------------
mongoose.connect(
  `mongodb+srv://Trelobill:${password}@smarttourism.dwabyg1.mongodb.net/${db_name}?retryWrites=true&w=majority`
);

//-----------------SERVER---------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
