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
import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:4000/api/v1/teachers/teacher-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Logged in successfully!');
        navigate('/teacher/dashboard');
      } else {
        alert(data.error || 'Failed to log in');
      }
    } catch (error) {
      alert('Error occurred: ' + error.message);
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
        <SubmitButton as="button" type="submit">Sign In</SubmitButton>
      </FormContainer>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;