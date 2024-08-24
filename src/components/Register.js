import React, { useState } from 'react';
import Footer from './Footer';

const Register = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValid({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+{}\[\]:;"'<>,.?/]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setSubmitting(false);
      return;
    }

    if (!Object.values(passwordValid).every(Boolean)) {
      setError('Password does not meet all criteria.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.hash = '#login'; // Redirect to login page after successful sign-up
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-${isDarkTheme ? 'gray-900' : 'white'} text-${isDarkTheme ? 'gray-300' : 'gray-900'}`}>
      <main className="flex-grow flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">Sign up for an account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6">First Name</label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold leading-6">Last Name</label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold leading-6">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ul className="mt-2 text-sm text-gray-500">
                  <li className={`flex items-center ${passwordValid.length ? 'text-green-500' : 'text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.length ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4L18 6" />
                    </svg>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValid.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.uppercase ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4L18 6" />
                    </svg>
                    Contains uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValid.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.lowercase ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4L18 6" />
                    </svg>
                    Contains lowercase letter
                  </li>
                  <li className={`flex items-center ${passwordValid.number ? 'text-green-500' : 'text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.number ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4L18 6" />
                    </svg>
                    Contains number
                  </li>
                  <li className={`flex items-center ${passwordValid.special ? 'text-green-500' : 'text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.special ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4L18 6" />
                    </svg>
                    Contains special character
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold leading-6">Confirm Password</label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting || !Object.values(passwordValid).every(Boolean) || formData.password !== formData.confirmPassword}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 animate-spin">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span>Signing up...</span>
                  </div>
                ) : submitted ? (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 animate-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span>Signed up!</span>
                  </div>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </form>
          <p className="mt-10 text-center text-sm">
            Already have an account? <a href="#login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Log in</a>
          </p>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Register;
