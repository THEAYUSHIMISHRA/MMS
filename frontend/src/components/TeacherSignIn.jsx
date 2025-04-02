// // TeacherSignIn.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherSignInContainer, FormContainer, InputField, SubmitButton, Heading } from '../styles/TeacherSignInStyles';
const TeacherSignIn = () => {
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
      const response = await fetch('http://localhost:4000/api/v1/teachers/t-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('teacher', JSON.stringify(data.teacher)); // Store teacher data
        alert("Login successful!");
        navigate('/teacher/dashboard'); // Redirect to dashboard
      } else {
        alert("Invalid email or password.");
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <TeacherSignInContainer>
  <Heading>Teacher Sign In</Heading> {/* Updated heading */}
  <FormContainer onSubmit={handleSignIn}>
    <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <SubmitButton as="button" type="submit">Sign In</SubmitButton>
  </FormContainer>
</TeacherSignInContainer>
  );
};

export default TeacherSignIn;