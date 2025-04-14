import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);
  if (loading) return <p>Loading feedbacks...</p>;

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">All Team Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li key={fb._id} className="border p-4 rounded">
              <p className="text-gray-800">
                <strong>Mentor:</strong> {fb.mentorId?.name || "Unknown"}
              </p>
              <p className="text-gray-800">
                <strong>Team:</strong> {fb.teamId?.name || "Unknown"}
              </p>
              <p className="mt-2">
                <strong>Feedback:</strong> {fb.feedbackText}
              </p>
              <p className="mt-1">
                <strong>Rating:</strong> ⭐ {fb.rating}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
