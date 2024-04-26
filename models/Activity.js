import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

var activitySchema = new Schema({
  _id: ObjectId,
  time: Date,
  probabilities: [{ type: Number }],
  metadata: {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  __v: Number,
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
