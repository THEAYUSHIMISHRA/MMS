// // // // TeacherSignIn.js

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';

// // const TeacherSignIn = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleSignIn = async (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       alert('Please enter both email and password');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:4000/api/v1/teachers/t-login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },

// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         localStorage.setItem('teacher', JSON.stringify(data.teacher)); // Store teacher data
// //         alert("Login successful!");
// //         navigate('/teacher/dashboard'); // Redirect to dashboard
// //       } else {
// //         alert("Invalid email or password.");
// //         alert(data.message); // Show error message
// //       }
// //     } catch (error) {
// //       console.error('Login Error:', error);
// //       alert('Invalid credentials or server error.');
// //     }
// //   };

// //   return (
// //     <TeacherSignInContainer>
// //       <h2>Teacher Sign In</h2>
// //       <FormContainer onSubmit={handleSignIn}>
// //         <InputField
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <InputField
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />

// //         <SubmitButton as="button" type="submit">Sign In</SubmitButton>
// //       </FormContainer>
// //     </TeacherSignInContainer>
// //   );
// // };

// // export default TeacherSignIn;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';

// const TeacherSignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert('Please enter both email and password');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/teachers/t-login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },

//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('teacher', JSON.stringify(data.teacher)); // Store teacher data
//         alert("Login successful!");
//         navigate('/teacher/dashboard'); // Redirect to dashboard
//       } else {
//         alert("Invalid email or password.");
//         alert(data.message); // Show error message
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       alert('Invalid credentials or server error.');
//     }
//   };

//   // Navigate to forgot password page
//   const handleForgotPassword = () => {
//     navigate('components/forgotpassword'); // Assuming you have a route for the forgot password page
//   };

//   return (
//     <TeacherSignInContainer>
//       <h2>Teacher Sign In</h2>
//       <FormContainer onSubmit={handleSignIn}>
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

//         <SubmitButton as="button" type="submit">Sign In</SubmitButton>

//         {/* Forgot Password Button */}
//         <button
//           type="button"
//           onClick={handleForgotPassword}
//           style={{
//             marginTop: '10px',
//             color: 'blue',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             textDecoration: 'underline',
//           }}
//         >
//           Forgot Password?
//         </button>
//       </FormContainer>
//     </TeacherSignInContainer>
//   );
// };

// export default TeacherSignIn;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png'; // Import logo
import {
  TeacherSignInContainer,
  FormContainer,
  InputField,
  SubmitButton,
  Heading,
  Logo, // Import logo styling
} from '../styles/TeacherSignInStyles';
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

  // Navigate to forgot password page
  const handleForgotPassword = () => {
    navigate('/teacher-signIn/forgotpassword'); // Correct navigation
  };

  return (
    <TeacherSignInContainer>
      <Logo src={logo} alt="Logo" /> {/* Logo added above heading */}
      <Heading>Teacher Sign In</Heading>
      <FormContainer onSubmit={handleSignIn}>
        <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
