const mongoose = require("mongoose");

const memorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", memorySchema);
