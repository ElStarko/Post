const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const {registerUserValidation, deleteUserValidation} = require("../middlewares/userValidation");
const auth = require("../middlewares/auth");

const router = express.Router();
const userController = new userCtrl()

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", registerUserValidation, userController.register);
router.delete("/:id", auth, userController.delete);


module.exports = router;
