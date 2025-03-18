const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const uri = process.env.URI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(uri);
    console.log("Database connected on Atlas");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = { connectDb };
