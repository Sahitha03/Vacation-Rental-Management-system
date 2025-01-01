const Listing=require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated())
        {
          req.session.redirectUrl=req.originalUrl;
          req.flash("error","you must be logged in to create listing");
          return res.redirect("/login");
        }
        next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}
module.exports.isOwner=async (req,res,next)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id))
  { 
     req.flash("error","You are not the owner of this listing");
     return res.redirect(`/listings/${id}`);
  }
  next();
};
//validateListing
module.exports.validateListing=(req,res,next)=>{
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg); // Ensure numeric status code is used
  } else {
    next();
  }
};

//validate review
module.exports.validateReview=(req,res,next)=>{
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const errMsg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};
//isAuthor
module.exports.isAuthor=async(req,res,next)=>{
  let {reviewId,id}=req.params;
  const review=await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currUser._id))
  { 
     req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`);
  }
  next();
}


