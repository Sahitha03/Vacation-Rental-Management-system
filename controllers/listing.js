
const Listing = require("../models/listing");
const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);  // Unique filename using current timestamp
  },
});

const upload = multer({ storage });

// Helper function to handle image uploads (now saving them locally)
const handleImages = async (files) => {
  if (files && files.length > 0) {
    const uploadedImages = [];
    for (const file of files) {
      try {
        // Store the file path (relative to the uploads folder)
        uploadedImages.push({
          url: file.path,  // Store local path of the uploaded file
          filename: file.filename, // Store the filename for reference
        });
      } catch (error) {
        console.error("File Upload Error:", error);
        throw new Error("Image upload failed");
      }
    }
    return uploadedImages;
  }
  return [];
};

// Fetch all listings
module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.json(allListings);  // Return the listings as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load listings" });
  }
};

// Category APIs (kept as is)
module.exports.trending = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Trending" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.rooms = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Rooms" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.iconiccities = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Iconic cities" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.mountains = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Mountains" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.castles = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Castles" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.pools = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Pools" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.camping = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Camping" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.farms = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Farms" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.arctic = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Arctic" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.boats = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Boats" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.lakes = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Lakes" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};
module.exports.tinyhomes = async (req, res) => {
  try {
    const allListings = await Listing.find({ category: "Tiny homes" });
    res.json(allListings);
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load listings. Please try again later.");
    res.redirect("/");
  }
};


// Controller for creating a new listing (with image upload to local storage)
module.exports.createListing = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { title, description, price, location, country } = req.body;

    // Process uploaded images to local storage
    const imageUrls = await handleImages(req.files);

    const newListing = new Listing({
      title,
      description,
      images: imageUrls, // Save array of image URLs (local file paths)
      price,
      location,
      country,
      // owner: req.user._id, // Ensure req.user exists (authenticated user)
    });

    // Save the new listing to the database
    await newListing.save();

    res.status(201).json({
      success: true,
      message: "New listing created successfully!",
      listing: newListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create the listing. Please try again.",
      error: error.message,
    });
  }
};

// Update an existing listing (with image upload to local storage)
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    // Update listing data
    listing.title = req.body.title || listing.title;
    listing.description = req.body.description || listing.description;
    listing.price = req.body.price || listing.price;
    listing.location = req.body.location || listing.location;
    listing.country = req.body.country || listing.country;

    // Handle new file uploads (update images)
    if (req.files && req.files.length > 0) {
      listing.images = await handleImages(req.files); // Save images locally
    }

    await listing.save();

    res.status(200).json({ message: "Listing updated successfully!", listing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update the listing. Please try again." });
  }
};

// Delete a listing
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    res.status(200).json({ message: "Listing deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the listing. Please try again." });
  }
};
