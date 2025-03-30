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
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    background: "linear-gradient(135deg, #0a1f44, #1e3a8a)", // Dark Blue Gradient
    color: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#62b6ff", // Sky Blue
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
    fontSize: "16px",
    fontWeight: "bold",
    color: "#62b6ff",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #62b6ff",
    borderRadius: "5px",
    background: "#1e3a8a",
    color: "white",
    transition: "0.3s",
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
  addButton: {
    background: "#62b6ff",
    color: "#0a1f44",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "15px",
    transition: "0.3s",
    width: "100%",
  },
  addButtonClicked: {
    transform: "scale(0.95)",
    boxShadow: "0px 0px 12px rgba(98, 182, 255, 0.8)",
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
  },
};

export default TeacherProfile;
