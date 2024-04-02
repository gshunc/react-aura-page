import mongoose from "mongoose";

const URI = process.env.MONGO_URI;
const options = {};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
