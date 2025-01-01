
const Listing=require("../models/listing");
const Review=require("../models/review");

//Create review
module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // Assuming body is named as per the updated form
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review created!");
    //res.redirect(/listings/${listing._id});
    res.redirect(`/listings/${listing._id}`);
    //res.send("new review saved");
  };

  //Delete review
  module.exports.destroyReview=async (req, res) => {
      const { id, reviewId } = req.params; // Destructure the listing and review IDs
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove the review ID from the listing
      await Review.findByIdAndDelete(reviewId); // Delete the review from the database
      req.flash("success", "Review deleted!");
      res.redirect(`/listings/${id}`); // Redirect to the listing page
    };