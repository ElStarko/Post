const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const jwtConfig = require("../config/jwtSecret");
const { registerUser, deleteUser } = require("../services/userServices");
const { generateRandomAvatar } = require("../utilities/randomAvatar");

class UserCtrl {
  register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const avatarUrl = await generateRandomAvatar(req.body.email);

      const userData = {
        ...req.body,
        password: hashedPassword,
        avatarUrl,
      };
      const user = await registerUser(userData);
      if (!user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwtConfig, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        
        const altText = `Avatar for user ${userData.firstName}`;
        res.json({
          msg: "User Successfully created!",
          data: {
            token,
            ...user._doc,
            avatarImage: `<img src="${avatarUrl}" alt="${altText}" />`,
          },
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };

  delete = async (req, res) => {
       console.log(111,req.param.id)
    try {
     

//       const errors = validationResult(req);
//       console.log(error,555)
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
console.log(222)
      const user = await deleteUser(req.param.id);
      console.log(user,555)
      if (!user) {
        return res.status(400).json({ msg: "No user found with this id" });
      }
      return res.status(200).json({ msg: "User was successfully deleted!" });
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };
}

module.exports = UserCtrl;
