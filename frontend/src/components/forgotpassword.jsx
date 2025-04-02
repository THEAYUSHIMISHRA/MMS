// import { useState } from "react";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleSendOTP = async (e) => {
//         e.preventDefault();
//         const response = await fetch("http://localhost:5000/api/auth/request-otp", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email }),
//         });

//         if (response.ok) {
//             setMessage("OTP sent to your email!");
//         } else {
//             setMessage("Error sending OTP");
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Forgot Password</h2>
//             <form onSubmit={handleSendOTP}>
//                 <label>Email:</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <button type="submit">Send OTP</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ForgotPassword;




import React, { useState } from "react";
import axios from "axios"; // Assuming you are using Axios for API calls
import { useNavigate } from "react-router-dom";

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
            const response = await axios.post("/api/forgot-password", { email });
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
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <p>Please enter your email to receive a password reset OTP.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                {message && <p>{message}</p>}
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
