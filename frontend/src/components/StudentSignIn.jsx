import React, { useState } from 'react';
import { StudentSignInContainer, FormContainer, InputField, SubmitButton, Heading } from '../styles/StudentSignInStyles';
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

  return (
    <StudentSignInContainer>
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
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
