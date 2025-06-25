import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const enteredEmail = form.email.value;
    const enteredPassword = form.password.value;

    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (
      storedUser &&
      storedUser.email === enteredEmail &&
      storedUser.password === enteredPassword
    ) {
      alert('Login successful!');
      navigate('/home'); 
    } else {
      alert('Invalid email or password');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-[600px] bg-gray p-10 rounded-xl ">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
         
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              name="email" 
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password" 
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-black font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <button
            onClick={goToRegister}
            className="text-black font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
