import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AdminSignIn from './AdminSignIn'; // Import AdminSignIn directly
import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import axios from 'axios';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const email = "swadhasri@gmail.com";
    // const password = "swagger123";

    if (email === "swadhasri@gmail.com" && password === "swagger123") {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
    //alert("Sign-in button clicked! 🚀");
    // try {
    //   console.log("Sending request to backend..."); 
    //   const response = await axios.post('http://localhost:4000/api/v1/users/admin/signin', { email, password });
      
    //   console.log("API Response:", response.data);
      
    //   if (response.data.success) {
    //     // Sign-in successful, redirect to admin dashboard
    //     console.log("Admin Email from LocalStorage:", adminEmail);
    //     localStorage.setItem("adminEmail", response.data.admin.email);
    //     navigate('/admin/dashboard');
    //     console.log("Success");
    //   } else {
    //     // Handle sign-in errors
    //     console.error('Sign-in failed');
    //   }
    // } catch (error) {
    //   console.error('Error during sign-in:', error);
    // }
  };

  return (
    <AdminSignInContainer>
      <h2>Admin Sign In</h2>
      <FormContainer>
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
        {/* <SubmitButton to="../Admin/Dashboard" onClick={handleSignIn}>Sign In</SubmitButton> */}
        <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;



//OTHER ADMIN
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';

// const AdminSignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = (e) => {
//     e.preventDefault();
// // using the mailid for entering dashboard no constraints given
//     const adminEmail = 'himanidobriyal8@gmail.com';
//     const adminPassword = 'password';

//     if (email === adminEmail && password === adminPassword) {
//       alert("Login successful! A confirmation email has been sent.");
//       navigate('/admin/dashboard');
//     } else {
//       alert("Invalid email or password.");
//     }
//   };

//   return (
//     <AdminSignInContainer>
//       <h2>Admin Sign In</h2>
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
//         <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
//       </FormContainer>
//     </AdminSignInContainer>
//   );
// };

// export default AdminSignIn;
