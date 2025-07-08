// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       alert('Please fill in all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5000/api/signup', {
//         name,
//         email,
//         password
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // ✅ Save token to localStorage
//         localStorage.setItem('token', token);

//         // ✅ Save user object to localStorage for userId usage later
//         localStorage.setItem('user', JSON.stringify(user));

//         alert('Signup successful! Redirecting...');
//         navigate('/questionnaire'); // redirect to questionnaire after signup
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data.message) {
//         alert(`Error: ${error.response.data.message}`);
//       } else {
//         alert('Signup failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-900 text-white">
//       {/* Left Side */}
//       <div
//         className="w-1/2 hidden lg:flex flex-col justify-between bg-cover bg-center rounded-r-3xl p-8"
//         style={{ backgroundImage: "url('bg-wave.webp')" }}
//       >
//         <div className="flex justify-end">
//           <a href="/" className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700">
//             ← Back
//           </a>
//         </div>
//         <div className="text-center mb-20">
//           <h1 className="text-3xl font-semibold">💧 AquaSense — Save Every Drop</h1>
//           <p className="text-sm mt-2 text-gray-200">
//             Join the movement to track, reduce, and optimize your water usage.
//           </p>
//         </div>
//       </div>

//       {/* Right Side with Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
//         <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
//           <h2 className="text-3xl font-bold text-white">Create your AquaSense account</h2>
//           <p className="text-sm text-gray-400">
//             Already have an account?{' '}
//             <a href="/login" className="text-purple-400 hover:underline">
//               Sign In
//             </a>
//           </p>

//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 transition"
//           >
//             {loading ? 'Signing Up...' : 'Sign Up'}
//           </button>

//           <div className="text-center text-sm text-gray-400">or continue with</div>

//           <div className="flex space-x-4">
//             <button
//               type="button"
//               className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                 alt="Google"
//                 className="w-5 h-5 mr-2"
//               />
//               Google
//             </button>
//             <button
//               type="button"
//               className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/303128/apple-logo.svg"
//                 alt="Apple"
//                 className="w-5 h-5 mr-2"
//               />
//               Apple
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        alert('Signup successful! Redirecting...');
        navigate('/questionnaire');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left Side */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-between bg-cover bg-center rounded-r-3xl p-8"
        style={{ backgroundImage: "url('bg-wave.webp')" }}
      >
        <div className="flex justify-end">
          <a href="/" className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700">
            ← Back
          </a>
        </div>
        <div className="text-center mb-20">
          <h1 className="text-3xl font-semibold">💧 AquaSense — Save Every Drop</h1>
          <p className="text-sm mt-2 text-gray-200">
            Join the movement to track, reduce, and optimize your water usage.
          </p>
        </div>
      </div>

      {/* Right Side with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="Logo.jpg"
              alt="AquaSense Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-white text-center">Create your AquaSense account</h2>
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-400 hover:underline">
              Sign In
            </a>
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* <div className="text-center text-sm text-gray-400">or continue with</div> */}

          {/* <div className="flex space-x-4">
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800"
            >
              <img
                src="https://www.svgrepo.com/show/303128/apple-logo.svg"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Apple
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}