import { useState } from "react";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp }),
        });

        if (response.ok) {
            setMessage("OTP Verified! You can now reset your password.");
        } else {
            setMessage("Invalid OTP");
        }
    };

    return (
        <div className="container">
            <h2>Enter OTP</h2>
            <form onSubmit={handleVerifyOTP}>
                <label>Enter OTP:</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <button type="submit">Verify OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyOTP;
