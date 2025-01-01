import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Listings = ({ allListings }) => {
  return (
    <div>
      <head>
        <style>
          {`
            #filters {
              display: flex;
              flex-wrap: wrap;
            }
            .filter {
              text-align: center;
              margin-right: 1.8rem;
              margin-top: 1rem;
              opacity: 0.7;
            }
            .filter p {
              font-size: 0.8rem;
            }
            .filter:hover {
              opacity: 1;
              cursor: pointer;
            }
            .filter a {
              color: inherit;
              text-decoration: none;
            }
              /* Position controls */
.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: #fff; /* White circle */
  border-radius: 50%; /* Make it circular */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; /* No border */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for better visibility */
  cursor: pointer;
}

/* Keep the controls hidden by default and show on hover */
.carousel-control-prev,
.carousel-control-next {
  visibility: hidden;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
  visibility: visible;
}

/* Arrow inside the circle */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none; /* Remove default Bootstrap arrow */
  font-family: "Font Awesome 5 Free"; /* Ensure Font Awesome is included */
  font-weight: 900;
  font-size: 18px;
  color: #000; /* Arrow color */
}

.carousel-control-prev-icon::after {
  content: '\f104'; /* Unicode for Font Awesome left arrow */
}

.carousel-control-next-icon::after {
  content: '\f105'; /* Unicode for Font Awesome right arrow */
}

/* Prevent appearance changes on focus or active states */
.carousel-control-prev:focus,
.carousel-control-next:focus,
.carousel-control-prev:active,
.carousel-control-next:active {
  outline: none; /* Remove focus outline */
  background-color: #fff; /* Keep the white circle */
  color: #000; /* Keep arrow black */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Ensure shadow consistency */
}
/*cards*/
.card{
    border: 2px;
    margin-bottom: 2rem;
}
.listing-card{
    border: none !important;
    margin-bottom: 2rem;
}
.card-img-top{
    border-radius: 1rem !important;
    object-fit:cover !important;
}
.card-body{
    padding:0 !important;
}
.card-text{
    font-weight:400;
}
.listing-link{
    text-decoration: none;
}

/*Card Effect*/
.card-img-overlay{
    opacity: 0;
}
.card-img-overlay:hover{
    opacity:0.2;
    background-color: white;
}
.row-cols-lg-4.row-cols-md-2.row-cols-sm-1 {
  margin-left: 20px; /* Adjust as needed (negative to offset padding) */
  margin-right: 20px; /* Adjust as needed (negative to offset padding) */
}
#filters
{
  margin-left: 120px; 
  margin-right: 120px;
}

  
`}
        </style>
      </head>
      <body>
        {/* Filters Section */}
        <div id="filters">
        {[
          { href: "/listings/trending", icon: "fa-fire", label: "Trending" },
          { href: "/listings/rooms", icon: "fa-bed", label: "Rooms" },
          { href: "/listings/iconiccities", icon: "fa-city", label: "Iconic cities" }, // Corrected icon
          { href: "/listings/mountains", icon: "fa-mountain", label: "Mountains" },
          { href: "/listings/castles", icon: "fa-fort-awesome", label: "Castles" },
          { href: "/listings/pools", icon: "fa-person-swimming", label: "Pools" },
          { href: "/listings/camping", icon: "fa-campground", label: "Camping" },
          { href: "/listings/farms", icon: "fa-tractor", label: "Farms" }, // Corrected icon
          { href: "/listings/arctic", icon: "fa-snowflake", label: "Arctic" },
         { href: "/listings/boats", icon: "fa-sailboat", label: "Boats" },
         { href: "/listings/lakes", icon: "fa-water", label: "Lakes" },
         { href: "/listings/tinyhomes", icon: "fa-house-chimney", label: "Tiny homes" },
].map((filter, index) => (
            <div className="filter" key={index}>
              <a href={filter.href}>
                <i className={`fa-solid ${filter.icon}`}></i>
              </a>
              <p>{filter.label}</p>
            </div>
          ))}
        </div>

        {/* Listings Section */}
        <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
  {allListings.map((listing) => (
    <a href={`/listings/${listing._id}`} className="listing-link" key={listing._id}>
      <div className="card col listing-card rounded-3">
        <Carousel id={`carousel${listing._id}`} interval={null} indicators={false}>
          {listing.images && listing.images.length > 0 ? (
            listing.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image.url}
                  className="d-block w-100 rounded-3"
                  alt="listing_image"
                  width="500"
                  height="230"
                />
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <img
                src="https://images.unsplash.com/photo-1513368967035-cbc26a7a56bc?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGxha2V8ZW58MHx8fHx8fDE%3D&ixlib=rb-1.2.1&q=80&w=400"
                className="d-block w-100 rounded-3"
                alt="default_image"
                width="500"
                height="230"
              />
            </Carousel.Item>
          )}
        </Carousel>

        {/* Card Body */}
        <div className="card-body">
          <p className="card-text">
            {listing.title}
            <br />
            <b>
              &#8377;
              {listing.price
                ? listing.price.toLocaleString("en-IN")
                : "Price not available"}
              <br />
            </b>
          </p>
        </div>
      </div>
    </a>
  ))}
</div>
      </body>
    </div>
  );
};

export default Listings;
