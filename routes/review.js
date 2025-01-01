const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isAuthor}=require("../middleware.js");
const ReviewController=require("../controllers/review.js");



// Reviews 
//POST route
router.post(
    "/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(ReviewController.createReview));
  
  // DELETE route to remove a review
  router.delete(
    "/:reviewId", 
    isLoggedIn,
    isAuthor,
    wrapAsync(ReviewController.destroyReview));
  module.exports=router;