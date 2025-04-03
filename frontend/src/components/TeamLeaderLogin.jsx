import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentSignInContainer } from '../styles/StudentSignInStyles';
import { FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import logo from '../assets/logo1.png'; // Importing the logo

export default function TeamLeaderLogin() {
  const [Ids, setIds] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const StudentLogin = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!Ids || !password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      StudentLogin.current.innerHTML = "Loading...";

      // Use GET with query parameters
      const response = await fetch(`http://localhost:4000/api/team/Teamlogin?Ids=${Ids}&password=${password}`);

      const data = await response.json();

      if (response.ok) {
        alert('Logged in successfully!');
        console.log(response);
        StudentLogin.current.innerHTML = "Sign In";
        navigate('/teams/team/' + Ids); // Navigate to the team dashboard
      } else {
        StudentLogin.current.innerHTML = "Sign In";
        alert(data.error || 'Failed to log in');
      }

    } catch (error) {
      console.log('Error occurred: ' + error);
      StudentLogin.current.innerHTML = "Sign In";
    }
  };

  return (
    <StudentSignInContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Logo with inline styling */}
      <img 
        src={logo} 
        alt="Logo" 
        style={{ 
          width: '100px', /* Small logo */
          height: 'auto',
          marginBottom: '70px', /* Reduced space below the logo */
          marginTop: '-90px' /* Moves the logo higher */
        }} 
      />
      
      <h2 style={{ color: 'white', marginBottom: '20px' }}>TEAM LEADER SIGN IN</h2>
      
      <FormContainer onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
        <InputField
          type="text"
          placeholder="Team ID"
          value={Ids}
          onChange={(e) => setIds(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
        />
        <SubmitButton as="button" ref={StudentLogin} type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign In
        </SubmitButton>
      </FormContainer>
    </StudentSignInContainer>
  );
}
