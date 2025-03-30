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

  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacher.name && teacher.department && teacher.email && teacher.specialization) {
      setTeachers([...teachers, teacher]);
      setTeacher({ name: "", department: "", email: "", specialization: "" });

      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
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
          onMouseOver={(e) => (e.target.style.background = styles.addButtonHover.background)}
          onMouseOut={(e) => (e.target.style.background = styles.addButton.background)}
        >
          Add Teacher
        </button>
      </form>

      <button
        style={styles.viewButton}
        onMouseOver={(e) => {
          e.target.style.background = styles.viewButtonHover.background;
          e.target.style.color = styles.viewButtonHover.color;
          e.target.style.transform = styles.viewButtonHover.transform;
          e.target.style.boxShadow = styles.viewButtonHover.boxShadow;
        }}
        onMouseOut={(e) => {
          e.target.style.background = styles.viewButton.background;
          e.target.style.color = styles.viewButton.color;
          e.target.style.transform = "none";
          e.target.style.boxShadow = "none";
        }}
        onClick={() => navigate("/teacher-details")}
      >
        View Teacher Details
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "25px",
    background: "linear-gradient(135deg, #0a1f44, #1e3a8a)", // Dark Blue
    color: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "30px",
    marginBottom: "15px",
    color: "white", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "10px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    marginBottom: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#white",
  },
  input: {
    padding: "12px",
    fontSize: "18px",
    border: "1px solid #62b6ff",
    borderRadius: "5px",
    background: "white", // White background for formality
    color: "#0a1f44", // Dark blue text
    transition: "0.3s",
    width: "100%", // Full width
    boxSizing: "border-box",
  },
  addButton: {
    background: "#62b6ff",
    color: "#0a1f44",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
    transition: "background 0.3s ease, transform 0.1s ease, box-shadow 0.2s ease",
    width: "100%",  // Ensure the button width matches input fields
    boxSizing: "border-box", // Prevents any unwanted margin overflow
    display: "block", // Ensures it behaves like inputs
    marginLeft: "-0.5px",
  },
  addButtonClicked: {
    transform: "scale(0.95)",
    boxShadow: "0px 0px 12px rgba(98, 182, 255, 0.8)",
  },
  addButtonHover: {
    background: "#80c1ff", // Lighter blue on hover
  },
  viewButton: {
    background: "transparent",
    color: "#62b6ff",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #62b6ff",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "15px",
    transition: "0.3s",
    width: "40%", // Same width as input fields
    boxSizing: "border-box",
  },
  viewButtonHover: {
    background: "#62b6ff", // Blue background on hover
    color: "#0a1f44", // Dark blue text
    transform: "scale(1.05)", // Slightly larger
    boxShadow: "0px 0px 12px rgba(98, 182, 255, 0.8)",
  },
};

export default TeacherProfile;
