import React, { useState } from 'react';

function StarRating({ initialRating = 0, onChange }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          onClick={() => {
            setRating(star);
            onChange(star);
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          xmlns="http://www.w3.org/2000/svg"
          fill={(hover || rating) >= star ? "gold" : "none"}
          viewBox="0 0 24 24"
          stroke="gold"
          strokeWidth={2}
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.158 6.65a1 1 0 00.95.69h6.993c.969 0 1.371 1.24.588 1.81l-5.668 4.117a1 1 0 00-.364 1.118l2.158 6.65c.3.921-.755 1.688-1.54 1.118L12 17.77l-5.668 4.117c-.784.57-1.838-.197-1.54-1.118l2.158-6.65a1 1 0 00-.364-1.118L1.918 12.077c-.783-.57-.38-1.81.588-1.81h6.993a1 1 0 00.95-.69l2.158-6.65z"
          />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
