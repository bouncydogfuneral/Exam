const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Procedure",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});



const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
