import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import routing machine CSS
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

const primaryColor = '#4F46E5'; // Tailwind indigo-600

export default function Book() {
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
  const flatpickrInstance = useRef(null);

  useEffect(() => {
    const now = new Date();
    const wibTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
    const isoString = wibTime.toISOString().slice(0, 16);

    setForm(prev => ({ ...prev, time: isoString }));

    // Initialize flatpickr
    flatpickrInstance.current = flatpickr('#datetime-picker', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      defaultDate: new Date(),
      onChange: selectedDates => {
        const selectedDate = selectedDates[0];
        setForm(prev => ({ ...prev, time: selectedDate.toISOString() }));
      }
    });

    // Initialize Leaflet
    if (!map) {
      const leafletMap = L.map('map', {
        center: [-2.5489, 118.0149], // Example Indonesia coordinates
        zoom: 5,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      setMap(leafletMap);
    }

    // Cleanup
    return () => {
      if (map) map.remove();
      if (flatpickrInstance.current) flatpickrInstance.current.destroy();
    };
  }, [map]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const locationName = await reverseGeocode(latitude, longitude);

        if (pickupMarker) pickupMarker.remove();

        const newPickupMarker = L.marker([latitude, longitude]).addTo(map);
        setPickupMarker(newPickupMarker);

        setForm((prev) => ({
          ...prev,
          pickup: locationName,
          pickupCoords: { lat: latitude, lon: longitude },
        }));

        map.setView([latitude, longitude], 15); // Zoom in more on current location

        if (form.destinationCoords) {
          calculateDistance(latitude, longitude, form.destinationCoords.lat, form.destinationCoords.lon);
          updateRoute([latitude, longitude], [form.destinationCoords.lat, form.destinationCoords.lon]);
        }
      },
      (err) => {
        console.error(err);
        alert('Failed to get your current location.');
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
      clearTimeout(typingTimeout);
      const timeoutId = setTimeout(() => searchLocation(value, 'destination'), 500);
      setTypingTimeout(timeoutId);
    }

    if (name === 'pickup') {
      clearTimeout(pickupTypingTimeout);
      const timeoutId = setTimeout(() => searchLocation(value, 'pickup'), 500);
      setPickupTypingTimeout(timeoutId);
    }
  };

  const searchLocation = async (query, field) => {
    if (!query.trim()) {
      if (field === 'destination') setSuggestions([]);
      else setPickupSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const places = data.map((place) => ({
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
      }));

      if (field === 'destination') setSuggestions(places);
      else setPickupSuggestions(places);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      if (field === 'destination') setSuggestions([]);
      else setPickupSuggestions([]);
    }
  };

  const handleSuggestionClick = (place, field) => {
    const lat = place.lat;
    const lon = place.lon;

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
        updateRoute(pickupMarker.getLatLng(), newMarker.getLatLng());
        map.fitBounds([pickupMarker.getLatLng(), newMarker.getLatLng()], { padding: [50, 50] });
      } else {
        map.setView([lat, lon], 15);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        pickup: place.name,
        pickupCoords: { lat, lon },
      }));
      setPickupSuggestions([]);

      if (pickupMarker) pickupMarker.remove();
      const newPickupMarker = L.marker([lat, lon]).addTo(map);
      setPickupMarker(newPickupMarker);

      if (form.destinationCoords) {
        calculateDistance(lat, lon, form.destinationCoords.lat, form.destinationCoords.lon);
        updateRoute(newPickupMarker.getLatLng(), marker.getLatLng());
        map.fitBounds([newPickupMarker.getLatLng(), marker.getLatLng()], { padding: [50, 50] });
      } else {
        map.setView([lat, lon], 15);
      }
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const from = L.latLng(lat1, lon1);
    const to = L.latLng(lat2, lon2);
    const dist = from.distanceTo(to); // in meters
    setDistance((dist / 1000).toFixed(2)); // in km
  };

  const updateRoute = (pickupLatLon, destinationLatLon) => {
    if (map) {
      if (routeControl) {
        map.removeControl(routeControl);
      }

      const newRouteControl = L.Routing.control({
        waypoints: [L.latLng(pickupLatLon), L.latLng(destinationLatLon)],
        lineOptions: {
          styles: [{ color: primaryColor, opacity: 0.8, weight: 5 }]
        },
        createMarker: () => null,
        routeWhileDragging: true,
      }).addTo(map);

      setRouteControl(newRouteControl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTime = dayjs(form.time).format('YYYY-MM-DD HH:mm:ss');

    const data = {
      ...form,
      time: formattedTime,
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
        alert('Your ride has been booked successfully!');
        setForm({
          name: '',
          pickup: '',
          destination: '',
          destinationCoords: null,
          pickupCoords: null,
          time: '',
        });
        setDistance(null);
        if (marker) {
          map.removeLayer(marker);
          setMarker(null);
        }
        if (pickupMarker) {
          map.removeLayer(pickupMarker);
          setPickupMarker(null);
        }
        if (routeControl) {
          map.removeControl(routeControl);
          setRouteControl(null);
        }
        if (map) {
          map.setView([-2.5489, 118.0149], 5); // Reset map view
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to book ride: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      alert('An unexpected error occurred while booking your ride.');
      console.error("Booking error:", error);
    }
  };

  return (
    <DefaultSidebar>
      <Head title='Pesan Perjalanan Anda' />
      <div className="w-full min-h-screen bg-white dark:bg-[#282828] overflow-auto p-6 md:p-10 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4 md:mb-6">
            Pesan Perjalanan
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Nama Pemesan
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nama Anda"
                value={form.name}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-[#282828] dark:text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Lokasi Jemput */}
            <div>
              <label htmlFor="pickup" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Lokasi Jemput
              </label>
              <div className="relative">
                <div className="flex">
                  <input
                    type="text"
                    id="pickup"
                    name="pickup"
                    placeholder="Masukkan lokasi jemput"
                    value={form.pickup}
                    onChange={handleChange}
                    autoComplete="off"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-[#282828] dark:text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 text-gray-700  dark:text-gray-200 font-semibold py-2 px-3 rounded-r focus:outline-none focus:shadow-outline"
                  >
                    Gunakan Lokasi Sekarang
                  </button>
                </div>
                {pickupSuggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full shadow-md z-10 rounded-b-md mt-1 max-h-48 overflow-y-auto">
                    {pickupSuggestions.map((s, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                        onClick={() => handleSuggestionClick(s, 'pickup')}
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Tujuan */}
            <div>
              <label htmlFor="destination" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Tujuan
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Masukkan tujuan"
                  value={form.destination}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-[#282828] dark:text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 w-full shadow-md z-10 rounded-b-md mt-1 max-h-48 overflow-y-auto">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                        onClick={() => handleSuggestionClick(s, 'destination')}
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Pemilih Tanggal & Waktu */}
            <div>
              <label htmlFor="datetime-picker" className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Tanggal & Waktu
              </label>
              <input
                id="datetime-picker"
                type="text"
                placeholder="Pilih Tanggal & Waktu"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-[#282828] dark:text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Jarak */}
            {distance && (
              <div className="text-gray-700 font-semibold">
                Estimasi Jarak: <span className="font-bold text-indigo-600">{distance} km</span>
              </div>
            )}

            {/* Peta */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2">
                Pratinjau Peta
              </label>
              <div id="map" className="w-full h-64 rounded border shadow-sm"></div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline`}
              >
                Pesan Perjalanan Anda
              </button>
            </div>
          </form>
        </div>
    </DefaultSidebar>
  );
}