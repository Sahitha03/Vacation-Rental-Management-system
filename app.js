if(process.env.NODE_ENV != "production")
{
   require("dotenv").config();
}

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const ExpressError=require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const userRouter=require("./routes/user.js");
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
app.use(cors());
app.use(express.json());  // Add this to your main server.js or app.js file
app.use('/uploads', express.static('uploads'));

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

app.get("/", (req, res) => {
  res.send("Hi, I am a root");
});


//Initialize session and flash middleware
 app.use(session(sessionOptions));
 app.use(flash());

 //A middleware tat initializes passport.
 app.use(passport.initialize());
 //A web application needs the ability to identify users as 
 //they browse from page to page.This series of requests and responses,each associated with the same user,is known as a session.
 app.use(passport.session());

 //use static authenticate method of model in LocalStrategy
 passport.use(new LocalStrategy(User.authenticate()));

 //use static serialize and deserialize of model for passport session support
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


//Flash message middleware
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

// app.get("/demouser",async(req,res)=>{
//    let fakeUser=new User({
//     email:"student@gmail.com",
//     username:"delta-student"
// });
// let registedUser=await User.register(fakeUser,"helloworld",);
// res.send(registedUser);
// });
// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

//404 error handling
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("error", { message });
// });
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  console.error(err.stack); // Log the stack trace
  res.status(statusCode).render("error", { message });
});
// Start the server
app.listen(8090, () => {
  console.log("Server is listening on port 8080");
});
