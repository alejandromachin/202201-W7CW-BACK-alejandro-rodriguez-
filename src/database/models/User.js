const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  like: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  dislike: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
