// import React from 'react';

// export default function Alerts({ waterUsedToday, dailyQuota }) {
//   if (waterUsedToday <= dailyQuota) return null;

//   return (
//     <div
//       role="alert"
//       aria-live="assertive"
//       className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//     >
//       ⚠️ You have exceeded your daily water usage limit!
//     </div>
//   );
// }

import React from 'react';

export default function Alerts({ waterUsedToday, dailyQuota }) {
  // Return null only if dailyQuota is undefined or null (allow 0)
  if (dailyQuota === undefined || dailyQuota === null) return null;

  const usagePercentage = (waterUsedToday / dailyQuota) * 100;

  let bgColor = '';
  let borderColor = '';
  let textColor = '';
  let message = '';

  if (usagePercentage <= 60) {
    bgColor = 'bg-green-100';
    borderColor = 'border-green-400';
    textColor = 'text-green-700';
    message = "✅ You're within safe usage limits.";
  } else if (usagePercentage <= 90) {
    bgColor = 'bg-yellow-100';
    borderColor = 'border-yellow-400';
    textColor = 'text-yellow-700';
    message = '⚠ Approaching your daily water limit.';
  } else {
    bgColor = 'bg-red-100';
    borderColor = 'border-red-400';
    textColor = 'text-red-700';
    message = "🚨 You've exceeded your daily water limit!";
  }

  // Debug logs (optional, remove in production)
  console.log('Alerts:', { waterUsedToday, dailyQuota, usagePercentage });

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${bgColor} ${borderColor} ${textColor} border px-4 py-3 rounded transition-all duration-500`}
    >
      {message}
    </div>
  );
}