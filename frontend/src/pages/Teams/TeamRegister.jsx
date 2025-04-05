import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [students, setStudents] = useState([{ name: "", email: "", course: "", studentId: "" }]);
  const [members, setMembers] = useState([{ name: "", email: "", course: "" }]);
  const navigate = useNavigate();

  const generateTeamId = async (students) => {
    if (!students || students.length === 0) return "T00";

    const uniqueCourses = [...new Set(students.map((m) => m.course?.charAt(0).toUpperCase() || ""))];
    const courseCode = uniqueCourses.sort().join("");

    try {
      const response = await axios.get("http://localhost:4000/api/v1/team/courses");
      const totalTeams = response.data.count || 0;
      const serialNumber = String(totalTeams + 1).padStart(2, "0");
      return `${courseCode}${serialNumber}`;
    } catch (error) {
      console.error("Error fetching team count:", error);
    }
  };

  const handleAddMember = () => {
    setStudents([...students, { name: "", email: "", course: "", studentId: `S${students.length + 1}` }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!students || students.length === 0) {
      alert("Please add at least one member to the team.");
      return;
    }

    const teamID = await generateTeamId(students);
    try {
      const response = await axios.post("http://localhost:4000/api/v1/team/register", {
        teamID,
        teamName,
        students,
      });
      alert(`Team registered successfully! Team ID: ${teamID}`);
      navigate(`/Teams/team/${response.data.teamID}`);
    } catch (error) {
      console.error("Error registering team:", error);
      alert("Failed to register team. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register a Team</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Team Name:</label>
          <input type="text" placeholder="Enter Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required style={styles.input} />
        </div>

        <div style={{ textAlign: "left" }}>
          <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
            Leader Email:
          </label>
          <input
            type="email"
            placeholder="Enter Leader Email"
            value={leaderEmail}
            onChange={(e) => setLeaderEmail(e.target.value)}
            required
            style={{
              width: "93%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid rgb(29, 70, 111)",
              fontSize: "16px",
              backgroundColor: "white",
              color: "black",
              marginTop: "5px",
            }}
          />
        </div>

        <h3 style={styles.subheading}>Team Members</h3>
        {students.map((student, index) => (
          <div key={index} style={styles.memberContainer}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} Name:</label>
              <input type="text" placeholder="Enter Name" value={student.name} onChange={(e) => setStudents([...students.slice(0, index), { ...student, name: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} Email:</label>
              <input type="email" placeholder="Enter Email" value={student.email} onChange={(e) => setStudents([...students.slice(0, index), { ...student, email: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Course:</label>
              <input type="text" placeholder="Enter Course" value={student.course} onChange={(e) => setStudents([...students.slice(0, index), { ...student, course: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Member {index + 1} ID:</label>
              <input type="text" placeholder="Enter ID" value={student.studentId} onChange={(e) => setStudents([...students.slice(0, index), { ...student, studentId: e.target.value }, ...students.slice(index + 1)])} required style={styles.input} />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddMember}
          style={{
            padding: "12px",
            backgroundColor: "rgb(29, 70, 111)",
            color: "white",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "0.3s",
            fontWeight: "bold",
            marginLeft: "15px",
            marginRight: "25px",
          }}
        >
          + Add Member
        </button>

        <button
          type="submit"
          style={{
            padding: "12px",
            marginTop: "15px",
            backgroundColor: "rgb(29, 70, 111)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "0.3s",
            marginLeft: "15px",
            marginRight: "25px",
          }}
        >
          Register Team
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  heading: { fontSize: "24px", color: "rgb(29, 70, 111)", marginBottom: "20px" },
  subheading: { fontSize: "20px", marginTop: "20px", marginBottom: "10px", color: "rgb(29, 70, 111)" },
  form: { maxWidth: "700px", margin: "0 auto" },
  formGroup: { marginBottom: "15px" },
  label: { fontWeight: "bold", display: "block", marginBottom: "5px" },
  input: { width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid rgb(29, 70, 111)" },
  memberContainer: {
    padding: "15px",
    backgroundColor: "rgb(240, 240, 240)",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};

export default TeamRegister;
