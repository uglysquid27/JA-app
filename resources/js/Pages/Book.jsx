import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine'; // Import the leaflet routing machine
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default function BookRide() {
  const [form, setForm] = useState({
    name: '',
    pickup: '',
    destination: '',
    destinationCoords: null,
    pickupCoords: null,
    time: '',
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // destination marker
  const [pickupMarker, setPickupMarker] = useState(null);
  const [routeControl, setRouteControl] = useState(null); // to store route control
  const [suggestions, setSuggestions] = useState([]);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [pickupTypingTimeout, setPickupTypingTimeout] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const now = new Date();
    // Convert to UTC+7 (WIB)
    const wibTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    const isoString = wibTime.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  
    setForm((prev) => ({
      ...prev,
      time: isoString, // Set default time to current WIB
    }));

    // Initialize Flatpickr for both date and time in one field
    flatpickr('#datetime-picker', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i', // Format for both date and time
      defaultDate: new Date(),  // Set default value to current date and time
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        setForm((prev) => ({ ...prev, time: selectedDate.toISOString() }));
      },
    });
  
    if (!map) {
      const leafletMap = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13,
      });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);
  
      setMap(leafletMap);
    }
  
    return () => {
      if (map) map.remove();
      flatpickr('#datetime-picker').destroy();
    };
  }, [map]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const locationName = await reverseGeocode(latitude, longitude);

        if (pickupMarker) pickupMarker.remove();

        const marker = L.marker([latitude, longitude]).addTo(map);
        setPickupMarker(marker);

        setForm((prev) => ({
          ...prev,
          pickup: locationName,
          pickupCoords: { lat: latitude, lon: longitude },
        }));

        map.setView([latitude, longitude], 13);

        if (form.destinationCoords) {
          calculateDistance(latitude, longitude, form.destinationCoords.lat, form.destinationCoords.lon);
          // Recalculate route when destination is set
          updateRoute([latitude, longitude], [form.destinationCoords.lat, form.destinationCoords.lon]);
        }
      },
      (err) => {
        console.error(err);
        alert('Failed to get location');
      }
    );
  };

  const reverseGeocode = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.display_name || `${lat}, ${lon}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'destination') {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeoutId = setTimeout(() => searchLocation(value, 'destination'), 500);
      setTypingTimeout(timeoutId);
    }

    if (name === 'pickup') {
      if (pickupTypingTimeout) clearTimeout(pickupTypingTimeout);
      const timeoutId = setTimeout(() => searchLocation(value, 'pickup'), 500);
      setPickupTypingTimeout(timeoutId);
    }
  };

  const searchLocation = async (query, field) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

    const res = await fetch(url);
    const data = await res.json();

    const places = data.map((place) => ({
      name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    }));

    if (field === 'destination') setSuggestions(places);
    else setPickupSuggestions(places);
  };

  const handleSuggestionClick = (place, field) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    if (field === 'destination') {
      setForm((prev) => ({
        ...prev,
        destination: place.name,
        destinationCoords: { lat, lon },
      }));
      setSuggestions([]);

      if (marker) marker.remove();
      const newMarker = L.marker([lat, lon]).addTo(map);
      setMarker(newMarker);

      if (form.pickupCoords) {
        calculateDistance(form.pickupCoords.lat, form.pickupCoords.lon, lat, lon);
      }

      // Update route
      if (pickupMarker) {
        updateRoute(pickupMarker.getLatLng(), newMarker.getLatLng());
      }

      // Fit map bounds to both markers
      if (pickupMarker) {
        map.fitBounds([pickupMarker.getLatLng(), newMarker.getLatLng()]);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        pickup: place.name,
        pickupCoords: { lat, lon },
      }));
      setPickupSuggestions([]);

      if (pickupMarker) pickupMarker.remove();
      const newMarker = L.marker([lat, lon]).addTo(map);
      setPickupMarker(newMarker);

      if (form.destinationCoords) {
        calculateDistance(lat, lon, form.destinationCoords.lat, form.destinationCoords.lon);
      }

      // Update route
      if (marker) {
        updateRoute(newMarker.getLatLng(), marker.getLatLng());
      }

      // Fit map bounds to both markers
      if (marker) {
        map.fitBounds([newMarker.getLatLng(), marker.getLatLng()]);
      }
    }

    map.setView([lat, lon], 13);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const from = L.latLng(lat1, lon1);
    const to = L.latLng(lat2, lon2);
    const dist = from.distanceTo(to); // in meters
    setDistance((dist / 1000).toFixed(2)); // in km
  };

  const updateRoute = (pickupLatLon, destinationLatLon) => {
    // Remove existing route
    if (routeControl) {
      routeControl.remove();
    }
  
    // Create a new route between the markers
    const route = L.Routing.control({
      waypoints: [L.latLng(pickupLatLon), L.latLng(destinationLatLon)],
      createMarker: () => null, // Disable the default markers (no name, just the path)
      routeWhileDragging: true, // Show the route while dragging
    }).addTo(map);
  
    setRouteControl(route); // Save the route control to update or remove later
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Format the time in the correct format for MySQL
    const formattedTime = new Date(form.time).toISOString().slice(0, 19).replace('T', ' ');
  
    const data = {
      ...form,
      time: formattedTime, // Use the formatted time here
    };
  
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Ride booked successfully!');
        setForm({
          name: '',
          pickup: '',
          destination: '',
          destinationCoords: null,
          pickupCoords: null,
          time: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to book ride: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while booking the ride.');
    }
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
          onChange={handleChange}
          required
          className="mb-4 w-full border px-4 py-2 rounded"
        />

        {/* Pickup */}
        <div className="relative mb-4">
          <label htmlFor="pickup" className="block font-semibold mb-1">
            Pickup Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="pickup"
              placeholder="Type pickup location"
              value={form.pickup}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="button"
              onClick={useCurrentLocation}
              className="bg-gray-200 px-4 rounded hover:bg-gray-300"
            >
              Use Current
            </button>
          </div>
          {pickupSuggestions.length > 0 && (
            <ul className="absolute bg-white border w-full shadow z-10 max-h-60 overflow-y-auto rounded mt-1">
              {pickupSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s, 'pickup')}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination */}
        <div className="relative mb-4">
          <label htmlFor="destination" className="block font-semibold mb-1">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            placeholder="Type destination"
            value={form.destination}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full border px-4 py-2 rounded"
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full shadow z-10 max-h-60 overflow-y-auto rounded mt-1">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s, 'destination')}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DateTime Picker */}
        <div className="mb-4">
          <label htmlFor="datetime" className="block mb-1 font-semibold">Date & Time</label>
          <input
            id="datetime-picker"
            type="text"
            placeholder="Select Date & Time"
            className="px-4 py-2 border rounded w-full"
          />
        </div>

        {/* Distance */}
        {distance && (
          <div className="mb-4 font-semibold">
            Estimated Distance: {distance} km
          </div>
        )}

        {/* Map */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Map</label>
          <div id="map" className="w-full h-64 rounded border"></div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
}
