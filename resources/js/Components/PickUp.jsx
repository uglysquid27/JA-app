import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PickupMap({ onLocationSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [address, setAddress] = useState(''); // For displaying the address

  useEffect(() => {
    if (mapInstanceRef.current) return; // Avoid reinitializing map

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapInstanceRef.current.setView([latitude, longitude], 15);
        const marker = L.marker([latitude, longitude], { draggable: true }).addTo(mapInstanceRef.current);
        onLocationSelect(`${latitude}, ${longitude}`);
        
        // Reverse geocode to get the address
        fetchReverseGeocode(latitude, longitude);

        // Update location on drag
        marker.on('dragend', function () {
          const { lat, lng } = marker.getLatLng();
          onLocationSelect(`${lat}, ${lng}`);
          fetchReverseGeocode(lat, lng);
        });
      }, (err) => {
        console.error('Geolocation error:', err);
      });
    }
  }, []);

  // Function to fetch the reverse geocoded address
  const fetchReverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      const address = data.display_name || 'No address found';
      setAddress(address);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Failed to fetch address');
    }
  };

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">Pickup Location</label>
      <div ref={mapRef} className="w-full h-64 rounded-lg border mb-4" />
      {address && (
        <div className="text-gray-700">
          <strong>Address:</strong> {address}
        </div>
      )}
    </div>
  );
}
