const mongoose = require("mongoose");

// create schema

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "rejected", "interested", "ignored"],
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  { timestamps: true }
);

// this is compund index bcoz both are needed for finding the the user
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can not send request to yourself!!!");
  }
  next();
});

// create a model and exports
module.exports = new mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema
);
