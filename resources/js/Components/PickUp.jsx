import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PickupMap({ onLocationSelect, destinationCoords }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const destinationMarkerRef = useRef(null);

  useEffect(() => {
    // Initialize map
    mapRef.current = L.map('pickup-map').setView([-7.981894, 112.626503], 13);

    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Handle map click
    mapRef.current.on('click', function (e) {
      const { lat, lng } = e.latlng;

      // Update marker
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      onLocationSelect(`${lat},${lng}`);
    });
  }, []);

  // Watch for destinationCoords changes
  useEffect(() => {
    if (destinationCoords && mapRef.current) {
      const [lng, lat] = destinationCoords;

      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setLatLng([lat, lng]);
      } else {
        destinationMarkerRef.current = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
          }),
        }).addTo(mapRef.current);
      }
    }
  }, [destinationCoords]);

  return <div id="pickup-map" className="h-64 w-full mb-4 rounded" />;
}
