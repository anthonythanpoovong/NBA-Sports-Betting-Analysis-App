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
    profilePicture: null, // New state for the profile picture
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
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, profilePicture: files[0] }); // Store the selected file
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'newPassword') {
        validatePassword(value);
      }
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

    const formDataToSubmit = new FormData(); // Use FormData for file uploads
    formDataToSubmit.append('email', email);
    formDataToSubmit.append('firstName', formData.firstName);
    formDataToSubmit.append('lastName', formData.lastName);
    if (changePassword) {
      formDataToSubmit.append('oldPassword', formData.oldPassword);
      formDataToSubmit.append('newPassword', formData.newPassword);
    }
    if (formData.profilePicture) {
      formDataToSubmit.append('profilePicture', formData.profilePicture); // Append the file
    }

    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        body: formDataToSubmit, // Send FormData
      });

      if (res.ok) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          // Optionally add the profile picture URL after upload
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
              <label htmlFor="changePassword" className="text-sm font-semibold leading-6">Change Password</label>
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
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-semibold leading-6">Profile Picture</label>
              <div className="mt-2">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className={`flex justify-center w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Submitting...' : 'Save Changes'}
              </button>
            </div>
          </form>
          {submitted && <div className="mt-4 text-green-500">Profile updated successfully!</div>}
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
