// // TeacherSignIn.js
// import React, { useState } from 'react';
// import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';

// const TeacherSignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     // For demonstration purposes, we'll directly navigate to the teacher dashboard route
//     // Replace this with your actual sign-in logic
//     console.log('Teacher Sign In:', { email, password });
//   };

//   return (
//     <TeacherSignInContainer>
//       <h2>Teacher Sign In</h2>
//       <FormContainer>
//         <InputField
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <InputField
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {/* Use Link component to navigate to teacher dashboard */}
//         <SubmitButton to="/teacher/dashboard" onClick={handleSignIn}>Sign In</SubmitButton>
//       </FormContainer>
//     </TeacherSignInContainer>
//   );
// };

// export default TeacherSignIn;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';
import { useNavigate } from 'react-router-dom';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSignIn = async(e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
=======
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
>>>>>>> d1fcedbb54c8f20344e5a2f3c9b2c28d1547a40b
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/teachers/teacher-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({ email, password }),  // Include password here if needed
=======
        body: JSON.stringify({ email, password }),
>>>>>>> d1fcedbb54c8f20344e5a2f3c9b2c28d1547a40b
      });

      const data = await response.json();
      if (response.ok) {
<<<<<<< HEAD
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
=======
        alert(data.message || 'Logged in successfully!');
        navigate('/teacher/dashboard');
      } else {
        alert(data.error || 'Failed to log in');
      }
    } catch (error) {
      alert('Error occurred: ' + error.message);
>>>>>>> d1fcedbb54c8f20344e5a2f3c9b2c28d1547a40b
    }
  };

  return (
    <TeacherSignInContainer>
      <h2>Teacher Sign In</h2>
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
<<<<<<< HEAD
        {/* Use Link component to navigate to teacher dashboard */}
        <SubmitButton as='button' type='submit'>Sign In</SubmitButton>
=======
        <SubmitButton as="button" type="submit">Sign In</SubmitButton>
>>>>>>> d1fcedbb54c8f20344e5a2f3c9b2c28d1547a40b
      </FormContainer>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;