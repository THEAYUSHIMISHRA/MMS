import React, { useState } from 'react';
import logo2 from '../assets/logo1.png';
import { StudentSignInContainer, FormContainer, InputField, SubmitButton, Heading, Logo2 } from '../styles/StudentSignInStyles';

import { useNavigate } from 'react-router-dom';

const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/students/s-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("student", JSON.stringify(data.student));
        alert(data.message || 'Logged in successfully!');
        navigate('/student/dashboard');
      } else {
        alert(data.error || 'Failed to log in');
      }
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };
  // Navigate to forgot password page
  const handleForgotPassword = () => {
    navigate('/student-signIn/forgotpassword'); // Correct navigation
  };

  return (
    <StudentSignInContainer>
    <Logo2 src={logo2} alt="Logo" /> {/* Logo added above heading */}
      <Heading>Student Sign In</Heading>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton as="button" type="submit">Sign In</SubmitButton>

        {/* Forgot Password Button */}
        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            marginTop: '10px',
            color: 'blue',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Forgot Password?
        </button>
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
