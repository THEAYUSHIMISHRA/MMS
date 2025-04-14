import React, { useState } from "react";

const FeedbackForm = () => {
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState("");
  const [teamId, setTeamId] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
      email,
      feedbackText,
      rating,
      teamId,
    };

    // Save to localStorage (simulate backend)
    const existing = JSON.parse(localStorage.getItem("feedbacks")) || [];
    localStorage.setItem("feedbacks", JSON.stringify([...existing, feedbackData]));

    setSuccess("✅ Feedback submitted successfully!");
    setEmail("");
    setFeedbackText("");
    setRating("");
    setTeamId("");
  };

  const pageStyle = {
    backgroundColor: "#34495e",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const containerStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "16px",
    margin: "-40px -40px 30px -40px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "600",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    fontSize: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#34495e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const successStyle = {
    color: "green",
    textAlign: "center",
    marginTop: "15px",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={titleStyle}>Feedback Form</div>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Team ID</label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Rating (1–5)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Feedback</label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              style={{ ...inputStyle, height: "100px", resize: "vertical" }}
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Submit Feedback
          </button>

          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;