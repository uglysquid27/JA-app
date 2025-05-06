import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function BookRide() {
  const [form, setForm] = useState({
    name: '',
    pickup: '',
    destination: '',
    destinationCoords: null,
    time: '',
  });

  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Initialize the Leaflet map
  useEffect(() => {
    if (!map) {
      const leafletMap = L.map('destination-map', {
        center: [51.505, -0.09], // Default center (change as necessary)
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

      // Map click event to select destination by clicking on the map
      leafletMap.on('click', function (e) {
        const { lat, lng } = e.latlng;
        updateMapLocation(lat, lng);
        fetchPlaceName(lat, lng);  // Fetch place name based on lat/lng
      });

      setMap(leafletMap);
    }

    return () => {
      if (map) {
        map.remove();  // Clean up map on unmount
      }
    };
  }, [map]);

  // Handle input change for destination
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'destination' && value.trim()) {
      // If there's a previous timeout, clear it
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set a new timeout to search after the user stops typing
      const timeoutId = setTimeout(() => {
        searchLocation(value);
      }, 500);  // 500ms delay

      // Store the timeout ID so we can clear it if needed
      setTypingTimeout(timeoutId);
    }
  };

  // Search for a place based on input value (using OpenStreetMap or similar data)
  const searchLocation = async (query) => {
    if (!map) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        // Update the suggestions list with the search results
        const places = data.map((place) => ({
          name: place.display_name,
          lat: place.lat,
          lon: place.lon,
        }));
        setSuggestions(places);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Handle suggestion click to select destination from dropdown
  const handleSuggestionClick = (suggestion) => {
    setForm({
      ...form,
      destination: suggestion.name,
      destinationCoords: { lat: suggestion.lat, lon: suggestion.lon },
    });
    setSuggestions([]); // Clear the suggestions dropdown after selection
    updateMapLocation(suggestion.lat, suggestion.lon); // Update map location
  };

  // Update map location and marker
  const updateMapLocation = (lat, lon) => {
    if (map) {
      map.setView([lat, lon], 13);  // Center the map to the new coordinates

      // Remove the old marker if exists
      if (marker) {
        marker.remove();
      }

      // Add new marker at the location
      const newMarker = L.marker([lat, lon]).addTo(map);
      setMarker(newMarker); // Store the new marker
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Submit form logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Book a Ride</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="mb-4 w-full border px-4 py-2 rounded"
        />

        {/* Pickup Location (Map Component) */}
        {/* You can add a similar map component for pickup location */}

        {/* Destination with input and suggestions dropdown */}
        <div className="relative mb-4">
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full border px-4 py-2 rounded"
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full shadow z-10 max-h-60 overflow-y-auto rounded">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Time */}
        <input
          type="datetime-local"
          name="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
          className="mb-6 w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Book Ride
        </button>
      </form>

      {/* Destination Map (Leaflet) */}
      <div className="mt-8 w-full h-96" id="destination-map"></div>
    </div>
  );
}
