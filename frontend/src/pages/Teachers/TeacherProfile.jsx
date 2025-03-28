import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherProfile = ({ teachers = [], setTeachers }) => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    department: "",
    email: "",
    specialization: "",
  });

  const [isClicked, setIsClicked] = useState(false); // Button click state

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacher.name && teacher.department && teacher.email && teacher.specialization) {
      setTeachers([...teachers, teacher]);
      setTeacher({ name: "", department: "", email: "", specialization: "" });

      // **Click Effect**
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Teacher Profile System</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.keys(teacher).map((key) => (
          <div key={key} style={styles.inputContainer}>
            <label htmlFor={key} style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={teacher[key]}
              onChange={handleChange}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            ...styles.addButton,
            ...(isClicked ? styles.addButtonClicked : {}),
          }}
        >
          Add Teacher
        </button>
      </form>

      <button style={styles.viewButton} onClick={() => navigate("/teacher-details")}>
        View Teacher Details
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "600px", // Increased width
    margin: "80px auto", // Added more space from the top
    padding: "30px", // Increased padding inside the container
    background: "linear-gradient(135deg, #1e1e1e, #3a3a3a)",
    color: "white",
    borderRadius: "12px", // Slightly rounded corners for better aesthetics
    boxShadow: "0px 6px 20px rgba(255, 255, 255, 0.2)", // Enhanced shadow for depth
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#f39c12",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Increased gap between input fields
    padding: "10px 20px", // Added padding inside the form
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    padding: "5px 10px", // Added padding inside the container
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#f39c12",
  },
  input: {
    padding: "12px", // Increased padding
    fontSize: "16px",
    border: "1px solid #f39c12",
    borderRadius: "5px",
    background: "#444",
    color: "white",
    transition: "0.3s",
    marginBottom: "10px", // Added more margin for spacing
    width: "100%", // Ensure full width alignment
    boxSizing: "border-box", // Prevents overflow issues
  },
  addButton: {
    background: "#f39c12",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "15px",
    transition: "transform 0.1s ease, box-shadow 0.2s ease",
    width: "100%", // Button width matches input fields
    boxSizing: "border-box", // Prevents overflow issues
  },
  addButtonClicked: {
    transform: "scale(0.95)", // Shrinks slightly when clicked
    boxShadow: "0px 0px 15px rgba(255, 204, 0, 0.8)", // Adds glow
  },
  viewButton: {
    background: "transparent",
    color: "#f39c12",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #f39c12",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "15px",
    transition: "0.3s",
  },
};

export default TeacherProfile;
