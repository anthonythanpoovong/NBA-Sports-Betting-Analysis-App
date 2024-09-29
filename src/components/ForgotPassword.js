import React, { useState } from 'react';
import Footer from './Footer';
import emailjs from 'emailjs-com';

const ForgotPassword = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Enter OTP and Reset Password

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  
  const validatePassword = (password) => {
    setPasswordValid({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+{}\[\]:;"'<>,.?/]/.test(password),
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    console.log('Email before submitting:', email);

    try {
      // Step 1: Get OTP from the server
      const res = await fetch('/api/auth/req-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        const { otp, firstname } = data;
        setFirstname(firstname);

        // Step 2: Send OTP email using EmailJS
        const templateParams = {
          to_email: email,
          otp_code: otp,
          to_name: firstname,
          from_email: 'no-reply@NPH.com'
        };

        console.log('Sending OTP with templateParams:', templateParams); 

        emailjs
          .send(
            process.env.EMAILJS_SERVICE_ID || 'service_knq3mzd', 
            process.env.EMAILJS_TEMPLATE_ID || 'template_30m5g0f', 
            templateParams,
            process.env.EMAILJS_USER_ID || 'ZdqLmaluYKWEmtK_y'
          )
          .then(
            () => {
              setSuccess('OTP has been sent to your email.');
              setStep(2); // Move to step 2 (OTP input)
            },
            (error) => {
              console.error('Failed to send OTP via EmailJS:', error);
              setError('Failed to send OTP. Please try again.');
            }
          );
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
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
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Password has been reset successfully.');
        setStep(1); // Reset back to step 1 after successful password reset
        setTimeout(() => {
          window.location.hash = '#login'; // Redirect to login page after successful reset
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-${isDarkTheme ? 'gray-900' : 'white'} text-${isDarkTheme ? 'gray-300' : 'gray-900'}`}>
      <main className="flex-grow flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
            {step === 1 ? 'Forgot your password?' : 'Enter OTP to Reset Password'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6">Email address</label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold leading-6">OTP</label>
                <div className="mt-2">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter the OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold leading-6">New Password</label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="New password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-md border-0 px-3.5 py-2 bg-gray-800 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2 animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
