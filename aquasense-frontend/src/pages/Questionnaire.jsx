// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Questionnaire() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     people: '',
//     children: '',
//     temperature: '',
//     waterSavingDevices: '',
//     showersPerDay: '',
//     timePerShower: '',
//     washingPerWeek: '',
//     rainwaterHarvesting: '',
//     tapsRunning: '',
//     estimatedUsage: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     const numberFields = ['people', 'children', 'temperature', 'showersPerDay', 'timePerShower', 'washingPerWeek', 'estimatedUsage'];
//     const yesNoFields = ['waterSavingDevices', 'rainwaterHarvesting', 'tapsRunning'];

//     numberFields.forEach((field) => {
//       if (!form[field] || isNaN(form[field]) || Number(form[field]) < 0) {
//         newErrors[field] = 'Please enter a valid number';
//       }
//     });

//     yesNoFields.forEach((field) => {
//       if (form[field] !== 'yes' && form[field] !== 'no') {
//         newErrors[field] = 'Please select Yes or No';
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     localStorage.setItem('questionnaireData', JSON.stringify(form));

//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const userId = user?.id;

//       if (!userId) {
//         alert('User ID not found. Please login again.');
//         navigate('/login');
//         return;
//       }
//       //const API_URL = <process className="env ML"></process> || 'http://localhost:8000';
//       const API_URL = process.env.REACT_APP_ML || 'http://localhost:8000';
//       const response = await fetch(`${API_URL}/predict`,{
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: userId,
//           people: Number(form.people),
//           children: Number(form.children),
//           temperature: Number(form.temperature),
//           showersPerDay: Number(form.showersPerDay),
//           timePerShower: Number(form.timePerShower),
//           washingPerWeek: Number(form.washingPerWeek),
//         }),
//       });

//       const data = await response.json();
//       console.log('Predicted usage from ML API:', data.predicted_usage);

//       const token = localStorage.getItem('token');

//       const API_URLS = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// try {
//   const saveresponse = await fetch(`${API_URLS}/predictions`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`, // use Bearer if backend requires it
//     },
//     body: JSON.stringify({ predictedUsage: data.predicted_usage }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to save prediction');
//   }

//   const result = await response.json();

//   localStorage.setItem('predictedUsage', data.predicted_usage);

//   navigate('/Dashboard1');
// } catch (error) {
//   console.error('Prediction saving error:', error);
//   alert('Error generating prediction. Try again.');
// }


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
//       <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg max-w-md w-full space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Water Usage Questionnaire</h2>

//         {/* Question 1 */}
//         <div>
//           <label className="block mb-1 font-semibold">1. How many people live in your home?</label>
//           <input
//             type="number"
//             name="people"
//             min="0"
//             value={form.people}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.people ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.people && <p className="text-red-500 mt-1 text-sm">{errors.people}</p>}
//         </div>

//         {/* Question 2 */}
//         <div>
//           <label className="block mb-1 font-semibold">2. How many children?</label>
//           <input
//             type="number"
//             name="children"
//             min="0"
//             value={form.children}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.children ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.children && <p className="text-red-500 mt-1 text-sm">{errors.children}</p>}
//         </div>

//         {/* Question 3 */}
//         <div>
//           <label className="block mb-1 font-semibold">3. What's your average daily temperature? (°C)</label>
//           <input
//             type="number"
//             name="temperature"
//             min="0"
//             value={form.temperature}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.temperature ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.temperature && <p className="text-red-500 mt-1 text-sm">{errors.temperature}</p>}
//         </div>

//         {/* Question 4 */}
//         <div>
//           <label className="block mb-1 font-semibold">4. Do you use water-saving devices?</label>
//           <div className="flex space-x-4">
//             {['yes', 'no'].map((val) => (
//               <label key={val}>
//                 <input
//                   type="radio"
//                   name="waterSavingDevices"
//                   value={val}
//                   checked={form.waterSavingDevices === val}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 {val.charAt(0).toUpperCase() + val.slice(1)}
//               </label>
//             ))}
//           </div>
//           {errors.waterSavingDevices && <p className="text-red-500 mt-1 text-sm">{errors.waterSavingDevices}</p>}
//         </div>

//         {/* Question 5 */}
//         <div>
//           <label className="block mb-1 font-semibold">5. How many showers per day?</label>
//           <input
//             type="number"
//             name="showersPerDay"
//             min="0"
//             value={form.showersPerDay}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.showersPerDay ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.showersPerDay && <p className="text-red-500 mt-1 text-sm">{errors.showersPerDay}</p>}
//         </div>

//         {/* Question 6 */}
//         <div>
//           <label className="block mb-1 font-semibold">6. Avg. time per shower? (minutes)</label>
//           <input
//             type="number"
//             name="timePerShower"
//             min="0"
//             value={form.timePerShower}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.timePerShower ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.timePerShower && <p className="text-red-500 mt-1 text-sm">{errors.timePerShower}</p>}
//         </div>

//         {/* Question 7 */}
//         <div>
//           <label className="block mb-1 font-semibold">7. Washing machine uses per week?</label>
//           <input
//             type="number"
//             name="washingPerWeek"
//             min="0"
//             value={form.washingPerWeek}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.washingPerWeek ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.washingPerWeek && <p className="text-red-500 mt-1 text-sm">{errors.washingPerWeek}</p>}
//         </div>

//         {/* Question 8 */}
//         <div>
//           <label className="block mb-1 font-semibold">8. Do you use rainwater harvesting?</label>
//           <div className="flex space-x-4">
//             {['yes', 'no'].map((val) => (
//               <label key={val}>
//                 <input
//                   type="radio"
//                   name="rainwaterHarvesting"
//                   value={val}
//                   checked={form.rainwaterHarvesting === val}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 {val.charAt(0).toUpperCase() + val.slice(1)}
//               </label>
//             ))}
//           </div>
//           {errors.rainwaterHarvesting && <p className="text-red-500 mt-1 text-sm">{errors.rainwaterHarvesting}</p>}
//         </div>

//         {/* Question 9 */}
//         <div>
//           <label className="block mb-1 font-semibold">9. Do you leave taps running often?</label>
//           <div className="flex space-x-4">
//             {['yes', 'no'].map((val) => (
//               <label key={val}>
//                 <input
//                   type="radio"
//                   name="tapsRunning"
//                   value={val}
//                   checked={form.tapsRunning === val}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 {val.charAt(0).toUpperCase() + val.slice(1)}
//               </label>
//             ))}
//           </div>
//           {errors.tapsRunning && <p className="text-red-500 mt-1 text-sm">{errors.tapsRunning}</p>}
//         </div>

//         {/* Question 10 */}
//         <div>
//           <label className="block mb-1 font-semibold">10. Estimated total daily water usage (liters)?</label>
//           <input
//             type="number"
//             name="estimatedUsage"
//             min="0"
//             value={form.estimatedUsage}
//             onChange={handleChange}
//             className={`w-full p-3 rounded bg-gray-700 text-white ${errors.estimatedUsage ? 'border-2 border-red-500' : 'border border-gray-600'}`}
//           />
//           {errors.estimatedUsage && <p className="text-red-500 mt-1 text-sm">{errors.estimatedUsage}</p>}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 transition"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Questionnaire() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    people: '',
    children: '',
    temperature: '',
    waterSavingDevices: '',
    showersPerDay: '',
    timePerShower: '',
    washingPerWeek: '',
    rainwaterHarvesting: '',
    tapsRunning: '',
    estimatedUsage: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const numberFields = ['people', 'children', 'temperature', 'showersPerDay', 'timePerShower', 'washingPerWeek', 'estimatedUsage'];
    const yesNoFields = ['waterSavingDevices', 'rainwaterHarvesting', 'tapsRunning'];

    numberFields.forEach((field) => {
      if (!form[field] || isNaN(form[field]) || Number(form[field]) < 0) {
        newErrors[field] = 'Please enter a valid number';
      }
    });

    yesNoFields.forEach((field) => {
      if (form[field] !== 'yes' && form[field] !== 'no') {
        newErrors[field] = 'Please select Yes or No';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem('questionnaireData', JSON.stringify(form));

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;

      if (!userId) {
        alert('User ID not found. Please login again.');
        navigate('/login');
        return;
      }

      const API_URL = process.env.REACT_APP_ML || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          people: Number(form.people),
          children: Number(form.children),
          temperature: Number(form.temperature),
          showersPerDay: Number(form.showersPerDay),
          timePerShower: Number(form.timePerShower),
          washingPerWeek: Number(form.washingPerWeek),
        }),
      });

      const data = await response.json();
      console.log('Predicted usage from ML API:', data.predicted_usage);

      const token = localStorage.getItem('token');
      const API_URLS = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      const saveResponse = await fetch(`${API_URLS}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ predictedUsage: data.predicted_usage }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save prediction');
      }

      const result = await saveResponse.json();

      localStorage.setItem('predictedUsage', data.predicted_usage);

      navigate('/Dashboard1');
    } catch (error) {
      console.error('Prediction saving error:', error);
      alert('Error generating prediction. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold mb-4">Water Usage Questionnaire</h2>

        {/* Question 1 */}
        <div>
          <label className="block mb-1 font-semibold">1. How many people live in your home?</label>
          <input
            type="number"
            name="people"
            min="0"
            value={form.people}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.people ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.people && <p className="text-red-500 mt-1 text-sm">{errors.people}</p>}
        </div>

        {/* Question 2 */}
        <div>
          <label className="block mb-1 font-semibold">2. How many children?</label>
          <input
            type="number"
            name="children"
            min="0"
            value={form.children}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.children ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.children && <p className="text-red-500 mt-1 text-sm">{errors.children}</p>}
        </div>

        {/* Question 3 */}
        <div>
          <label className="block mb-1 font-semibold">3. What's your average daily temperature? (°C)</label>
          <input
            type="number"
            name="temperature"
            min="0"
            value={form.temperature}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.temperature ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.temperature && <p className="text-red-500 mt-1 text-sm">{errors.temperature}</p>}
        </div>

        {/* Question 4 */}
        <div>
          <label className="block mb-1 font-semibold">4. Do you use water-saving devices?</label>
          <div className="flex space-x-4">
            {['yes', 'no'].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="waterSavingDevices"
                  value={val}
                  checked={form.waterSavingDevices === val}
                  onChange={handleChange}
                  className="mr-2"
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
          {errors.waterSavingDevices && <p className="text-red-500 mt-1 text-sm">{errors.waterSavingDevices}</p>}
        </div>

        {/* Question 5 */}
        <div>
          <label className="block mb-1 font-semibold">5. How many showers per day?</label>
          <input
            type="number"
            name="showersPerDay"
            min="0"
            value={form.showersPerDay}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.showersPerDay ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.showersPerDay && <p className="text-red-500 mt-1 text-sm">{errors.showersPerDay}</p>}
        </div>

        {/* Question 6 */}
        <div>
          <label className="block mb-1 font-semibold">6. Avg. time per shower? (minutes)</label>
          <input
            type="number"
            name="timePerShower"
            min="0"
            value={form.timePerShower}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.timePerShower ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.timePerShower && <p className="text-red-500 mt-1 text-sm">{errors.timePerShower}</p>}
        </div>

        {/* Question 7 */}
        <div>
          <label className="block mb-1 font-semibold">7. Washing machine uses per week?</label>
          <input
            type="number"
            name="washingPerWeek"
            min="0"
            value={form.washingPerWeek}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.washingPerWeek ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.washingPerWeek && <p className="text-red-500 mt-1 text-sm">{errors.washingPerWeek}</p>}
        </div>

        {/* Question 8 */}
        <div>
          <label className="block mb-1 font-semibold">8. Do you use rainwater harvesting?</label>
          <div className="flex space-x-4">
            {['yes', 'no'].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="rainwaterHarvesting"
                  value={val}
                  checked={form.rainwaterHarvesting === val}
                  onChange={handleChange}
                  className="mr-2"
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
          {errors.rainwaterHarvesting && <p className="text-red-500 mt-1 text-sm">{errors.rainwaterHarvesting}</p>}
        </div>

        {/* Question 9 */}
        <div>
          <label className="block mb-1 font-semibold">9. Do you leave taps running often?</label>
          <div className="flex space-x-4">
            {['yes', 'no'].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="tapsRunning"
                  value={val}
                  checked={form.tapsRunning === val}
                  onChange={handleChange}
                  className="mr-2"
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
          {errors.tapsRunning && <p className="text-red-500 mt-1 text-sm">{errors.tapsRunning}</p>}
        </div>

        {/* Question 10 */}
        <div>
          <label className="block mb-1 font-semibold">10. Estimated total daily water usage (liters)?</label>
          <input
            type="number"
            name="estimatedUsage"
            min="0"
            value={form.estimatedUsage}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-gray-700 text-white ${errors.estimatedUsage ? 'border-2 border-red-500' : 'border border-gray-600'}`}
          />
          {errors.estimatedUsage && <p className="text-red-500 mt-1 text-sm">{errors.estimatedUsage}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
}
