const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
 const Review = require("./models/review.js");
const app = express();

// Database connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL); //{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  //});
}

// Set up EJS and views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files

// // Middleware setup

// app.use(express.json());

//Session configuration
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
   },
};

//Initialize session and flash middleware
 app.use(session(sessionOptions));
 app.use(flash());

//Flash message middleware
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   next();
// });

// Routes
app.get("/", (req, res) => {
  res.send("Hi, I am a root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//404 error handling
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});
// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
