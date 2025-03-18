const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: { type: String, required: true },
  blogDesc: { type: String, required: true },
  blogDescShort: { type: String, required: true },
  blogImageUrl: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isArchived: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  category: { 
    type: String, 
    required: true, 
    enum: ["Political", "Vacation", "Travel" , "Technology", "Health", "Education", "Entertainment"]
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
