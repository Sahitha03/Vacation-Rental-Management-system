import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './components/HomePage'; // Ensure HomePage is imported correctly
import Trending from './components/Trending';
import Arctic from './components/Arctic';
import Rooms from './components/Rooms';
import Iconiccities from './components/Iconiccities';
import Mountains from './components/Mountains';
import Castles from './components/Castles';
import Pools from './components/Pools';
import Camping from './components/Camping';
import Farms from './components/Farms';
import Boats from './components/Boats';
import Lakes from './components/Lakes';
import Tinyhomes from './components/Tinyhomes';
import './App.css';
import NewListingForm from './components/NewListingForm';






const App = () => {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    // Fetch the listings data from the correct backend URL
    fetch('http://localhost:8090/listings') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAllListings(data))
      .catch((error) => console.error('Error fetching listings:', error));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/listings" element={<HomePage allListings={allListings} />} />
          <Route path="/listings/trending" element={<Trending allListings={allListings} />} />
          <Route path="/listings/arctic" element={<Arctic allListings={allListings}/>}/>
          <Route path="/listings/rooms" element={<Rooms allListings={allListings}/>}/>
          <Route path="/listings/iconiccities" element={<Iconiccities allListings={allListings}/>}/>
          <Route path="/listings/mountains" element={<Mountains allListings={allListings}/>}/>
          <Route path="/listings/castles" element={<Castles allListings={allListings}/>}/>
          <Route path="/listings/pools" element={<Pools allListings={allListings}/>}/>
          <Route path="/listings/camping" element={<Camping allListings={allListings}/>}/>
          <Route path="/listings/farms" element={<Farms allListings={allListings}/>}/>
          <Route path="/listings/boats" element={<Boats allListings={allListings}/>}/>
          <Route path="/listings/lakes" element={<Lakes allListings={allListings}/>}/>
          <Route path="/listings/tinyhomes" element={<Tinyhomes allListings={allListings}/>}/>
          <Route path="/listings/new" element={<NewListingForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
