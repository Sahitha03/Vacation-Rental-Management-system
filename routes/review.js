const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
  };

// Reviews 
//POST route
router.post(
    "/", 
    validateReview, 
    wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // Assuming body is named as per the updated form
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    //req.flash("success", "New Review created!");
    //res.redirect(/listings/${listing._id});
    res.redirect(`/listings/${listing._id}`);
    //res.send("new review saved");
  }));
  
  // DELETE route to remove a review
  router.delete(
    "/:reviewId", 
    wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params; // Destructure the listing and review IDs
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove the review ID from the listing
    await Review.findByIdAndDelete(reviewId); // Delete the review from the database
    //req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`); // Redirect to the listing page
  }));
  module.exports=router;