const { check } = require("express-validator");

const registerUserValidation = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

const deleteUserValidation = [
       check("id", "user id is required").not().isEmpty(),
]

module.exports = {registerUserValidation, deleteUserValidation};
