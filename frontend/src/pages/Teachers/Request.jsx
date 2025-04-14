import { useContext, useEffect, useState } from "react";
import axios from "axios";
import contexts from "../../components/ContextApi";
import { ProfileContainer } from "../../styles/SettingsProfileStyles";
import { Content, SidebarContainer } from "../../styles/AnnouncementStyles";
import Sidebar from "./Sidebar";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  let { ContextDetails } = useContext(contexts);
  const teacherId = ContextDetails.TeacherId;

  useEffect(() => {
    if (teacherId) fetchRequests();
  }, [teacherId]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/requests/teacher/${teacherId}`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleResponse = async (requestId, status) => {
    try {
      await axios.post("http://localhost:4000/api/v1/requests/respond", { requestId, status });
      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  // Dummy data for cards
  const dummyRequests = [
    {
      _id: "dummy1",
      studentName: "Isha",
      studentEmail: "isha@example.com",
      projectDetails: "Hospital Management (Java)",
      groupId: "CSD060",
      status: "pending",
    },
    {
      _id: "dummy2",
      studentName: "Ayushi",
      studentEmail: "ayushi@example.com",
      projectDetails: "Hospital Management (Java)",
      groupId: "CSD060",
      status: "pending",
    },
  ];

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <div style={styles.requestContainer}>
          <h2 style={styles.heading}>Student Mentorship Requests</h2>

          {/* Dummy request cards */}
          <div style={styles.cardContainer}>
            {dummyRequests.map((req) => (
              <div key={req._id} style={styles.card}>
                <h3 style={styles.cardTitle}>{req.studentName}</h3>
                <p style={styles.cardText}><strong>Email:</strong> {req.studentEmail}</p>
                <p style={styles.cardText}><strong>Project:</strong> {req.projectDetails}</p>
                <p style={styles.cardText}><strong>Group ID:</strong> {req.groupId}</p>
                <div style={styles.cardActions}>
                  <button style={styles.acceptBtn}>Accept</button>
                  <button style={styles.rejectBtn}>Reject</button>
                  <button style={styles.queryBtn}>Query</button>
                </div>
              </div>
            ))}
          </div>

          {/* Table-based dynamic requests */}
          {requests.length > 0 && (
            <table style={styles.requestTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Student Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Project Details</th>
                  <th style={styles.tableHeader}>Group ID</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td style={styles.tableCell}>{req?.studentName || "N/A"}</td>
                    <td style={styles.tableCell}>{req?.studentEmail || "N/A"}</td>
                    <td style={styles.tableCell}>{req.projectDetails}</td>
                    <td style={styles.tableCell}>{req.groupId}</td>
                    <td style={{ ...styles.tableCell, ...styles.status[req.status?.toLowerCase()] }}>
                      {req.status}
                    </td>
                    <td style={styles.tableCell}>
                      {req.status === "pending" ? (
                        <>
                          <button style={styles.acceptBtn} onClick={() => handleResponse(req._id, "Accepted")}>Accept</button>
                          <button style={styles.rejectBtn} onClick={() => handleResponse(req._id, "Rejected")}>Reject</button>
                          <button style={styles.queryBtn} onClick={() => handleResponse(req._id, "Query")}>Query</button>
                        </>
                      ) : (
                        <span>{req.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Content>
    </ProfileContainer>
  );
};

// ✅ Inline styles
const styles = {
  requestContainer: {
    padding: "20px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#1d466f",
    fontSize: "28px",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "white",
    color: "solid rgb(29, 70, 111)",
    borderRadius: "12px",
    padding: "20px",
    width: "300px",
    border:"8px solid rgb(29, 70, 111)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "16px",
    margin: "4px 0",
    
  },
  cardActions: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  acceptBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  rejectBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  queryBtn: {
    backgroundColor: "#ffc107",
    color: "black",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  requestTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#000",
  },
  status: {
    accepted: { color: "green", fontWeight: "bold" },
    rejected: { color: "red", fontWeight: "bold" },
    query: { color: "orange", fontWeight: "bold" },
  },
};

export default Requests;
