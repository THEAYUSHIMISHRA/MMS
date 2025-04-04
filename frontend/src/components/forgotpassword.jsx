// import React, { useState } from "react";

// import axios from "axios"; // Assuming you are using Axios for API calls
// import { useNavigate } from "react-router-dom";
// import {
//     ForgotPasswordContainer,
//     Title,
//     Description,
//     Input,
//     Button,
//     Message
// } from "../styles/forgotpasswordstyles";

// s

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState(""); // To display success/error message
//     const [loading, setLoading] = useState(false); // To show loading state
//     const navigate = useNavigate(); // To navigate to the next page (e.g., OTP page)

//     const handleEmailChange = (e) => setEmail(e.target.value);

//     const handleRequestOTP = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:4000/api/v1/forgotpass/request-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setMessage('OTP sent to your email');
//             } else {
//                 setMessage(data.message);
//             }
//         } catch (error) {
//             setMessage('Error sending OTP');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             // Make API call to your backend to send OTP to the email
//             const response = await axios.post('http://localhost:4000/api/v1/forgotpass/request-otp', { email });
//             if (response.data.success) {
//                 setMessage("OTP sent to your email.");
//                 // Redirect to OTP verification page
//                 navigate("/verify-otp");
//             } else {
//                 setMessage(response.data.message || "Error sending OTP.");
//             }
//         } catch (error) {
//             setMessage("An error occurred, please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="forgot-password-container">
//             <h2>Forgot Password</h2>
//             <p>Please enter your email to receive a password reset OTP.</p>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         required
//                     />
//                 </div>
//                 {message && <p>{message}</p>}
//                 <div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? "Sending..." : "Send OTP"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ForgotPassword;



import React, { useState } from "react";
import axios from "axios"; // Assuming you are using Axios for API calls
import { useNavigate } from "react-router-dom";
import {
    ForgotPasswordContainer,
    Title,
    Description,
    Input,
    Button,
    Message
} from "../styles/forgotpasswordstyles"; // Corrected import path

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // To display success/error message
    const [loading, setLoading] = useState(false); // To show loading state
    const navigate = useNavigate(); // To navigate to the next page (e.g., OTP page)

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Make API call to your backend to send OTP to the email
            const response = await axios.post('http://localhost:4000/api/v1/forgotpass/request-otp', { email });
            if (response.data.success) {
                setMessage("OTP sent to your email.");
                // Redirect to OTP verification page
                navigate("/verify-otp");
            } else {
                setMessage(response.data.message || "Error sending OTP.");
            }
        } catch (error) {
            setMessage("An error occurred, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ForgotPasswordContainer>
            <Title>Forgot Password</Title>
            <Description>Please enter your email to receive a password reset OTP.</Description>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                {message && <Message>{message}</Message>}
                <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send OTP"}
                </Button>
            </form>
        </ForgotPasswordContainer>
    );
};

export default ForgotPassword;
