import React, { useEffect, useState } from 'react';
import Footer from "../Footer";
import Image from 'next/image';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode directly

const ProfilePage = ({ theme }) => {
  const [userProfile, setUserProfile] = useState({});
  const [userName, setUserName] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    // Retrieve the token and user data from localStorage
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        // Use user data from localStorage if available
        if (userData) {
          setUserName(userData.firstName);
          setUserProfile(userData);
        } else {
          // Fetch user data if not available in localStorage
          const fetchUserData = async () => {
            try {
              const response = await fetch(`/api/user/${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                const { user } = await response.json();
                setUserProfile(user);
                setUserName(user.firstName); // Update state with user data
              } else {
                console.error('Failed to fetch user data');
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };

          fetchUserData();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div id="#profile" className={`flex flex-col min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8">
            <div className="relative h-32 w-32 mx-auto mb-4"> {/* Updated height and width */}
              <Image
                src={userProfile.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} // Use updated profile picture or placeholder
                alt="Profile Placeholder"
                layout="intrinsic" // Use intrinsic layout if you have fixed dimensions
                width={128}
                height={128}
              />
            </div>
            <h1 className={`text-4xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
              {userName ? `Welcome back, ${userName}` : 'Loading...'}
            </h1>
            <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
              View and manage your profile details here
            </p>
          </header>

          <section className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"// Placeholder image for profile
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">Name: {userProfile.firstName} {userProfile.lastName}</p>
                <p className="text-lg">Email: {userProfile.email}</p>
                <p className="text-lg">Member Since: {userProfile.createdAt}</p>
                <button href = "#edit" onClick={() => window.location.href = '#edit'} className={`mt-4 py-2 px-4 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Edit Profile</button>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>Your Recent Activities</h2>
              <p className={`mt-2 text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>Here’s a summary of your recent activities on NBA Prediction Hub.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* Example recent activities */}
              <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <h3 className="text-lg font-semibold mb-2">Activity 1</h3>
                <p className="text-sm text-gray-500 mb-4">Details about activity 1.</p>
              </div>
              <div className={`p-6 shadow-lg rounded-lg ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <h3 className="text-lg font-semibold mb-2">Activity 2</h3>
                <p className="text-sm text-gray-500 mb-4">Details about activity 2.</p>
              </div>
              {/* End of activities */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
