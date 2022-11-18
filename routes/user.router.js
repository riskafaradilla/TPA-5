const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserByID,
  addUser,
  deleteUserByID,
  deleteAllUser,
  updateUserByID,
  login,
  register,
} = require("../controllers/user.controller");

router.get("/", getAllUser);
router.get("/:id", getUserByID);
router.post("/", addUser);
router.delete("/:id", deleteUserByID);
router.delete("/", deleteAllUser);
router.put("/:id", updateUserByID);
router.post("/login", login);
router.post("/register", register);

module.exports = router;