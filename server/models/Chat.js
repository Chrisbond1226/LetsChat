const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const chatSchema = new Schema(
  {
    chatText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
