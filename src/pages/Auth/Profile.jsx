import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('registeredUser')) || {};
    setFormData({
      fullName: storedUser.fullName || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
      address: storedUser.address || '',
      city: storedUser.city || '',
      zip: storedUser.zip || '',
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...JSON.parse(localStorage.getItem('registeredUser')), ...formData };
    localStorage.setItem('registeredUser', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 ">
      {/* Add border and border-gray-300 classes here */}
      <div className="max-w-screen-xl w-full mx-auto bg-white rounded-xl shadow p-10 border border-gray-300">
        <h2 className="text-3xl font-bold mb-8">Profile Information</h2>
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="10001"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;