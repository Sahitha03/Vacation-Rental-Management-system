
// Initialize map
var map = L.map('map').setView([16.5062, 80.6480], 13); // Coordinates for Vijayawada

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Marker for Vijayawada
L.marker([16.5062, 80.6480]).addTo(map).bindPopup("Vijayawada");

// Circle around Vijayawada
L.circle([16.5062, 80.6480], {
    color: 'blue',
    fillColor: '#3a87ad',
    fillOpacity: 0.4,
    radius: 500
}).addTo(map);
