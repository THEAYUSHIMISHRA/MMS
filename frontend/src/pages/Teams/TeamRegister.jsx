import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [students, setStudents] = useState([{ name: "", email: "", course: "", studentId: "" }]);
  const navigate = useNavigate();

  const generateTeamId = async (students) => {
    if ( !students || students.length === 0) return "T00"
    // Extract first letter from each unique course
    const uniqueCourses = [...new Set(students.map((m) => m.course?.charAt(0).toUpperCase() || ""))];
    
    // Sort letters for consistency
    const courseCode = uniqueCourses.sort().join("");
  
    try {
      // Fetch the total number of teams
    const response = await axios.get("http://localhost:4000/api/v1/team/courses");
    const totalTeams = response.data.count || 0;

    // Generate Team ID (Next number in sequence)
    const serialNumber = String(totalTeams + 1).padStart(2, "0");

    return `${courseCode}${serialNumber}`;

    } catch (error) {

      console.error("Error fetching team count:", error);
      //return `${courseCode}01`; // Default if count fetch fails
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
      //alert("Team registered successfully! Invitations sent.");
      // navigate(`/pages/Teams/team/${response.data.teamId}`);//by client
      navigate(`/Teams/team/${response.data.teamID}`);//by Dev
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

        {/* <div style={styles.formGroup}>
          <label style={styles.label}>Leader Email:</label>
          <input type="email" placeholder="Enter Leader Email" value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Leader Course:</label>
          <input type="text" placeholder="Enter as CS, AI, IT" value={leaderCourse} onChange={(e) => setLeaderCourse(e.target.value)} required style={styles.input} />

        </div> */}

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

        <button type="button" onClick={handleAddMember} style={styles.addButton}>+ Add Member</button>
        <button type="submit" style={styles.submitButton}>Register Team</button>
      </form>
    </div>
  );
};

// 🎨 **Inline CSS Styles**
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "25px",
    backgroundColor: "#343a40",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "white",
    
  },
  subheading: {
    fontSize: "20px",
    marginTop: "20px",
    marginBottom: "10px",
    textDecoration: "underline",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
 
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  memberContainer: {
    padding: "15px",
    backgroundColor: "#495057",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  addButton: {
    padding: "10px 15px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  submitButton: {
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default TeamRegister;
