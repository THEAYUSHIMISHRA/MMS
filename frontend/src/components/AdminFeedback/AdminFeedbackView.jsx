import React, { useEffect, useState } from "react";

const AdminFeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>All Feedback</h2>
      {feedbacks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((fb, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Team ID:</strong> {fb.teamId}</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Feedback:</strong> {fb.feedbackText}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminFeedbackView;
