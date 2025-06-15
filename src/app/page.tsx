'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { authenticateUser } from '@utils/authService';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const userData = await authenticateUser(name, phone);
    // localStorage.setItem('userData', JSON.stringify(userData));
    router.push('/menu');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-white text-gray-800 px-4 py-6">
      <div className="w-full bg-gradient-to-b from-orange-500 to-orange-300 rounded-b-3xl pb-10 text-center">
        <h1 className="text-2xl font-bold text-white mt-6">Welcome to BBQ Inn</h1>
        <p className="text-white text-sm mt-2">To Personalise your experience,<br />Please share a few Details</p>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-[-3rem] z-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g., Rahul"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center space-x-2">
              <select className="px-2 py-2 border border-gray-300 rounded-lg bg-white text-sm">
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            🍽️ Let's Dine
          </button>
        </form>
      </div>
      
        {/* Special Card */}
        <div className="w-full max-w-md bg-gradient-to-r from-yellow-100 to-green-100 rounded-xl p-4 mt-6 text-center">
          <div className="flex justify-center mb-2">
            <img src="/biryani-icon.png" alt="dish" className="w-10 h-10" />
          </div>
          <h2 className="font-semibold text-lg">Chef's Special Today</h2>
          <p className="text-sm mt-1">Aromatic Hyderabadi Biryani with tender mutton and fragrant basmati rice</p>
          <div className="mt-2 flex justify-center space-x-1">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* Terms & Guest Link */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>By continuing, you agree to our<br /><span className="text-blue-500 underline cursor-pointer">terms & conditions</span></p>
          <a href="#" className="text-blue-600 font-medium underline mt-2 inline-block">Continue as Guest</a>
        </div>
        
    </main>
  );
}
