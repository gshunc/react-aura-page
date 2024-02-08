import mongoose from "mongoose";

const URI = process.env.MONGO_URI;
const options = {};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
