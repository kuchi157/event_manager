const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
