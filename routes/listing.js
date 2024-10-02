const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

// Middleware to validate listing data
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg); // Ensure numeric status code is used
  } else {
    next();
  }
};

// Index Route
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// New Route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews").lean();
  res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    //req.flash("success", "New listing created!");
    res.redirect("/listings");
  })
);

// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).lean();
  res.render("listings/edit.ejs", { listing });
}));

// Update Route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    //console.log("Updating listing with ID:", id);
    //console.log("New listing data:", req.body.listing);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
    
    // Log the redirect URL for debugging
   // console.log("Redirecting to:", `/listings/${id}`);
    
    
  })
);

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  //req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
}));

module.exports = router;
