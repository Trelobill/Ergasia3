const express = require("express");
const router = express.Router();

const {checkAge, checkDuplicateEmail, getUsersByEmail, getAllUsers, registerNewUser, updateUser, deleteUser} = require("../controllers/userController.js");

router.get("/", getUsersByEmail);
router.get("/all", getAllUsers);
router.post("/register", checkAge, checkDuplicateEmail, registerNewUser);
router.patch("/update", checkAge, updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
