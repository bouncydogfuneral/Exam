const express = require("express");
const reviewController = require("../controller/reviewController");
const authcontroller = require("../controller/authController");
const { protect, restrictTo } = authcontroller;
const { getAllReviews, createReview } = reviewController;

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route("/").get(getAllReviews);
reviewRouter
  .route("/:procedureId/reviews")
  .post(protect, restrictTo("user"), createReview);
module.exports = reviewRouter;
