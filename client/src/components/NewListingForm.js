import React, { useState } from "react";

function NewListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: null, // For file uploads
    price: "",
    location: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file inputs separately
    if (name === "images") {
      setFormData({
        ...formData,
        images: files, // Store multiple files
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state
    setError(""); // Reset previous error

    // Create FormData for multipart/form-data
    const body = new FormData();
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("price", formData.price);
    body.append("location", formData.location);
    body.append("country", formData.country);

    // Append all selected images if available
    if (formData.images) {
      Array.from(formData.images).forEach((file) => {
        body.append("images[]", file); // Ensure images[] is the field name
      });
    }

    try {
      const response = await fetch("http://localhost:8090/listings", {
        method: "POST",
        body, // FormData automatically sets the correct headers
      });

      const result = await response.json();

      if (response.ok) {
        alert("Listing created successfully!");
        console.log(result); // New listing details
        // Reset form data after successful submission
        setFormData({
          title: "",
          description: "",
          images: null,
          price: "",
          location: "",
          country: "",
        });
      } else {
        setError(result.message || "Failed to create the listing.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while creating the listing.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div>
      <h2>Create New Listing</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images" // Ensure this is images, not images[]
            onChange={handleChange}
            multiple // Allow multiple file selection
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0" // Prevent negative prices
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}

export default NewListingForm;
