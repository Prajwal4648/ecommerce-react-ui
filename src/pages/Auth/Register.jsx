import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

   if (password.length < 6) {
  alert("Password must be at least 6 characters long.");
  return;
}

if (password !== confirmPassword) {
  alert("Passwords don't match.");
  return;
}


    const newUser = {
      email: form.email.value,
      username: form.username.value,
      password: password,
      name: {
        firstname: form.fullName.value.split(" ")[0] || "",
        lastname: form.fullName.value.split(" ")[1] || "",
      },
      address: {
        city: "Sample City",
        street: form.address.value,
        number: parseInt(form.userId.value) || 1,
        zipcode: "000000",
        geolocation: {
          lat: "0",
          long: "0",
        },
      },
      phone: form.phone.value,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-600 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Start your journey with us
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              name="userId"
              type="text"
              placeholder="Enter user ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Choose a username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="First Last"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Street address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="col-span-full flex items-start gap-2 text-sm mt-2 ">
            <input type="checkbox" required className="mt-1 cursor-pointer" />
            I agree to the Terms and Conditions and Privacy Policy
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
            >
              Create Account
            </button>
          </div>

          <p className="col-span-full text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-purple-600 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
