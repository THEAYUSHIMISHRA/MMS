import { useState, useEffect } from "react";
import axios from "axios";

const TeacherMessagingPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const exampleRequests = [
    { _id: "1", studentName: "Isha", groupId: "CSD059", projectDetails: "AI Chatbot", status: "pending" },
    { _id: "2", studentName: "Himani", groupId: "CSD060", projectDetails: "Smart Attendance", status: "accepted" },
    { _id: "3", studentName: "Ayushi Mishra", groupId: "CSD061", projectDetails: "E-learning Platform", status: "query" },
    { _id: "4", studentName: "Swadha Sri", groupId: "CSD062", projectDetails: "Health Tracker", status: "pending" },
  ];

  useEffect(() => {
    axios
      .get("/api/teacher/requests", { params: { teacherId: "teacher_id_here" } })
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : exampleRequests;
        setRequests(data);
        setFilteredRequests(data);
      })
      .catch(() => {
        setRequests(exampleRequests);
        setFilteredRequests(exampleRequests);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = requests.filter((req) =>
      req.studentName.toLowerCase().includes(term)
    );
    setFilteredRequests(filtered);
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>Messages</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search student..."
          value={searchTerm}
          onChange={handleSearch}
          style={searchStyle}
        />

        {filteredRequests.length === 0 ? (
          <p style={{ color: "#444", textAlign: "center" }}>No matching requests found</p>
        ) : (
          filteredRequests.map((request) => (
            <div key={request._id} style={chatCardStyle}>
              <p style={chatText}><strong>Name:</strong> {request.studentName}</p>
              <p style={chatText}><strong>Group ID:</strong> {request.groupId}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#ffffff",
};

const boxStyle = {
  width: "400px",
  maxHeight: "90vh",
  overflowY: "auto",
  padding: "20px",
  borderRadius: "10px",
  border: "5px solid rgb(29, 50, 90)",
  boxShadow:"0 8px 20px rgba(0, 0, 0, 0.5)",
  backgroundColor: "#f9f9f9",
};

const titleStyle = {
  color: "rgb(29, 50, 90)",
  marginBottom: "20px",
  textAlign: "center",
};

const searchStyle = {
  padding: "10px",
  width: "90%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "20px",
};

const chatCardStyle = {
  backgroundColor: "rgb(29, 50, 90)",
  color: "white",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const chatText = {
  margin: 0,
  fontSize: "16px",
};

export default TeacherMessagingPage;
