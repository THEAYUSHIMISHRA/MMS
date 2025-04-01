// ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/v1/forgot-password/request-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('OTP sent to your email');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error sending OTP');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleRequestOTP}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
