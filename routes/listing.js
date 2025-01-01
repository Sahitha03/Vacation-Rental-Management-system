const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Listingcontroller = require("../controllers/listing.js");
const multer = require("multer");
const path = require("path");

// Configure multer to store files in the 'uploads' folder locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, Date.now() + ext); // Unique filename based on timestamp
  },
});

const upload = multer({ storage }); // Apply the storage configuration

// Home route for all listings
router.route("/")
  .get(wrapAsync(Listingcontroller.index)) // Fetch all listings
  .post(
    // isLoggedIn, // Uncomment this to require the user to be logged in to create a listing
    upload.array("listing[images][]", 5), // Allow multiple image uploads (up to 5 images)
    //validateListing, // Validate the listing data
    wrapAsync(Listingcontroller.createListing) // Handle the creation of the listing
  );

// Category-based listing routes
router.route("/trending").get(wrapAsync(Listingcontroller.trending));
router.route("/rooms").get(wrapAsync(Listingcontroller.rooms));
router.route("/iconiccities").get(wrapAsync(Listingcontroller.iconiccities));
router.route("/mountains").get(wrapAsync(Listingcontroller.mountains));
router.route("/castles").get(wrapAsync(Listingcontroller.castles));
router.route("/pools").get(wrapAsync(Listingcontroller.pools));
router.route("/camping").get(wrapAsync(Listingcontroller.camping));
router.route("/farms").get(wrapAsync(Listingcontroller.farms));
router.route("/arctic").get(wrapAsync(Listingcontroller.arctic));
router.route("/boats").get(wrapAsync(Listingcontroller.boats));
router.route("/lakes").get(wrapAsync(Listingcontroller.lakes));
router.route("/tinyhomes").get(wrapAsync(Listingcontroller.tinyhomes));

// Render form to create a new listing
// router.get("/new", wrapAsync(Listingcontroller.renderNewForm));

// Specific Listing Routes (dynamic `:id` for individual listings)
router.route("/:id")
  .get(wrapAsync(Listingcontroller.showListing)) // Fetch a single listing
  .put(
    isLoggedIn,
    isOwner,
    upload.array("listing[images][]", 5), // Handle image uploads for updates (up to 5 images)
    validateListing, // Validate updated listing data
    wrapAsync(Listingcontroller.updateListing) // Handle updating the listing
  )
  .delete(isLoggedIn, isOwner, wrapAsync(Listingcontroller.destroyListing)); // Delete listing

// Edit route for a listing (to edit an existing listing)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(Listingcontroller.renderEditForm) // Render form for editing the listing
);

module.exports = router;
