const User = require("../models/User");

const registerUser = async function (userData) {
  let user = await User.findOne({ email: userData.email });
  if (user) return null;

  user = new User(userData);
  return user.save();
};

const deleteUser = async function (id){
       const user = await User.findOne({ id });
       if (!user) return null;
       user.deleted = true; 
       return user.save();    
}

module.exports = {
  registerUser,
  deleteUser
};
