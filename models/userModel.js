const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog"}]
});

const User = mongoose.model("User", userSchema);

module.exports = { User }; 
