import React, { useState } from 'react';

const tips = [
  'Turn off the tap while brushing to save up to 8 liters of water per minute.',
  'Use a bucket instead of a hose to wash your car and save water.',
  'Fix leaking faucets immediately to prevent water waste.',
  'Water your plants early in the morning or late in the evening to minimize evaporation.',
  'Collect rainwater to use for gardening and cleaning.',
];

export default function Optimizationtips() {
  const [index, setIndex] = useState(0);

  const nextTip = () => {
    setIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <section
      className="bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-md"
      aria-label="Water Optimization Tips"
    >
      <h2 className="text-2xl font-bold text-emerald-800 mb-3 tracking-wide">
        💡 Optimization Tip
      </h2>

      <p className="text-base text-gray-800 italic mb-4 transition-opacity duration-500 ease-in-out">
        {tips[index]}
      </p>

      <button
        onClick={nextTip}
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
        aria-label="Next optimization tip"
      >
        Next Tip
      </button>
    </section>
  );
}