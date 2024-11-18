import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

const EditProfile = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [email, setEmail] = useState('');
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
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const emailFromToken = decodedToken.email;

        setEmail(emailFromToken);
        setFormData(prevData => ({
          ...prevData,
          email: emailFromToken,
        }));

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'newPassword') {
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

  const handleCheckboxChange = () => {
    setChangePassword(!changePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (changePassword && formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match.');
      setSubmitting(false);
      return;
    }

    if (changePassword && !Object.values(passwordValid).every(Boolean)) {
      setError('New password does not meet all criteria.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          oldPassword: changePassword ? formData.oldPassword : undefined,
          newPassword: changePassword ? formData.newPassword : undefined,
        }),
      });

      if (res.ok) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser
         = {
          ...currentUser,
          email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        
          
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSubmitted(true);
        setTimeout(() => {
          window.location.hash = '#profile';
        }, 2000);
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
    <div id="edit" className={`flex flex-col min-h-screen bg-${isDarkTheme ? 'gray-900' : 'white'} text-${isDarkTheme ? 'gray-300' : 'gray-900'}`}>
      <main className="flex-grow flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">Edit Your Profile</h2>
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
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 ${isDarkTheme ? 'bg-gray-800 text-gray-300 ring-gray-600 placeholder:text-gray-500' : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-500'} shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 ${isDarkTheme ? 'bg-gray-800 text-gray-300 ring-gray-600 placeholder:text-gray-500' : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-500'} shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                id="changePassword"
                type="checkbox"
                checked={changePassword}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="changePassword" className="text-sm font-semibold leading-6">
                Change Password
              </label>
            </div>
            {changePassword && (
              <>
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-semibold leading-6">Old Password</label>
                  <div className="mt-2">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 px-3.5 py-2 ${isDarkTheme ? 'bg-gray-800 text-gray-300 ring-gray-600 placeholder:text-gray-500' : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-500'} shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold leading-6">New Password</label>
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 px-3.5 py-2 ${isDarkTheme ? 'bg-gray-800 text-gray-300 ring-gray-600 placeholder:text-gray-500' : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-500'} shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                    <ul className="mt-2 text-sm">
                      <li className={`flex items-center ${passwordValid.length ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.length ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0v-4zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clipRule="evenodd" />
                        </svg>
                        At least 8 characters
                      </li>
                      <li className={`flex items-center ${passwordValid.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.uppercase ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0v-4zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clipRule="evenodd" />
                        </svg>
                        At least one uppercase letter
                      </li>
                      <li className={`flex items-center ${passwordValid.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.lowercase ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0v-4zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clipRule="evenodd" />
                        </svg>
                        At least one lowercase letter
                      </li>
                      <li className={`flex items-center ${passwordValid.number ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.number ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0v-4zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clipRule="evenodd" />
                        </svg>
                        At least one number
                      </li>
                      <li className={`flex items-center ${passwordValid.special ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.special ? 'text-green-500' : 'text-red-500'}`} viewBox="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${passwordValid.special ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 0-2 0v4a1 1 0 0 0 2 0v-4zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clipRule="evenodd" />
                        </svg>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-semibold leading-6">Confirm New Password</label>
                  <div className="mt-2">
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 px-3.5 py-2 ${isDarkTheme ? 'bg-gray-800 text-gray-300 ring-gray-600 placeholder:text-gray-500' : 'bg-white text-gray-900 ring-gray-300 placeholder:text-gray-500'} shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
              </>
            )}
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            {submitted && (
              <div className="text-green-500 text-sm">
                Profile updated successfully!
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-transform duration-300 ease-in-out ${submitting ? 'opacity-50 cursor-not-allowed' : ''} ${submitted ? 'animate-pulse' : ''} ${isDarkTheme ? 'hover:bg-indigo-700' : 'hover:bg-indigo-500'}`}
              >
                {submitting ? 'Saving Changes...' : submitted ? 'Profile Updated!' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
