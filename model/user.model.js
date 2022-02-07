const express = require("express");
const app = express();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  {
    // timestamps: true,
  }
);

module.exports = mongoose.model("UserData", userSchema);
