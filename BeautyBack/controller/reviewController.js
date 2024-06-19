const Review = require("../model/reviewModel");
const Tour = require("../model/tourModel");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("author").populate("tourId");
    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId).populate(
      "author"
    );
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const authorId = req.user.id;

    const newReview = (
      await Review.create({ ...req.body, tourId: tourId, author: authorId })
    ).populate("author");
    await newReview.save();
    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
