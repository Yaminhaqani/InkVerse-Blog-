const { User } = require("../models/userModel");



const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).lean(); // pure json conversion
    if (user) {
      res.render("userDetails", {
        title: "Dashboard",
        username: user.username,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserDetails };