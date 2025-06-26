import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
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
      console.log("User registered:", result);

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-[600px] bg-gray p-10 rounded-xl ">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">Start your journey with us</p>

        <p className="text-center text-sm text-gray-500 mb-6">
          Already have an account?{' '}
          <button
            onClick={goToLogin}
            className="text-black font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              name="userId"
              placeholder="Enter a user ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="First Last"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" required />
            I agree to the Terms and Conditions and Privacy Policy
          </label>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
