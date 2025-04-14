import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const [teamName, setTeamName] = useState("");
  const [students, setStudents] = useState([{ name: "", email: "", course: "", studentId: "" }]);
  const navigate = useNavigate();

<<<<<<< HEAD
  // const generateTeamId = async (students) => {
  //   if ( !students || students.length === 0) return "T00"
  //   // Extract first letter from each unique course
  //   const uniqueCourses = [...new Set(students.map((m) => m.course?.charAt(0).toUpperCase() || ""))];
    
  //   // Sort letters for consistency
  //   const courseCode = uniqueCourses.sort().join("");
  
  //   try {
  //     // Fetch the total number of teams
  //   const response = await axios.get("http://localhost:4000/api/v1/team/courses");
  //   const totalTeams = response.data.count || 0;

  //   // Generate Team ID (Next number in sequence)
  //   const serialNumber = String(totalTeams + 1).padStart(2, "0");

  //   return `${courseCode}${serialNumber}`;

  //   } catch (error) {

  //     console.error("Error fetching team count:", error);
  //     return `${courseCode}01`; // Default if count fetch fails
  //   }
  // };
=======
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
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5

  const handleAddMember = () => {
    setStudents([...students, { name: "", email: "", course: "", studentId: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!students || students.length === 0) {
      alert("Please add at least one member to the team.");
      return;
    }

    
    try {
      const response = await axios.post("http://localhost:4000/api/v1/team/register", {
        // teamID,
        teamName,
        students,
      });
<<<<<<< HEAD
      
      const teamId = response.data.teamId;

      alert(`Team registered successfully! Team ID: ${teamId}`);
      //alert("Team registered successfully! Invitations sent.");
      // navigate(`/pages/Teams/team/${response.data.teamId}`);//by client
      navigate(`/teams/team/${teamId}`);//by Dev
=======
      alert(`Team registered successfully! Team ID: ${teamID}`);
      navigate(`/Teams/team/${response.data.teamID}`);
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5
    } catch (error) {
      console.error("Error registering team:", error);
      alert("Failed to register team. Please try again.");
    }
  };

  return (
<<<<<<< HEAD
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
              <input type="text" placeholder="Enter ID" value={student.studentId} onChange={(e) => setStudents([...students.slice(0, index), { ...student, studentId: e.target.value }, ...students.slice(index + 1)])} pattern="BTBT[CSI]{1}[0-9]{2}[0-9]{3}"
  title="Format: BTBTI22143" />
            </div>
          </div>
        ))}
    {/* <div
=======
    <div
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5
      style={{
        backgroundColor: "rgb(29, 70, 111)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
<<<<<<< HEAD
      }}>
      <div
=======
      }}
    >
      <form
        onSubmit={handleSubmit}
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5
        style={{
          width: "100%",
          maxWidth: "750px",
          backgroundColor: "#ffffff",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          maxHeight: "95vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            color: "rgb(29, 70, 111)",
            marginBottom: "25px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Register a Team
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "6px",
              color: "rgb(29, 70, 111)",
              fontSize: "16px",
            }}
          >
            Team Name:
          </label>
          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <h3
          style={{
            fontSize: "22px",
            marginTop: "20px",
            marginBottom: "15px",
            color: "rgb(29, 70, 111)",
            borderBottom: "2px solid rgb(29, 70, 111)",
            paddingBottom: "5px",
          }}
        >
<<<<<<< HEAD
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
              Team Name:
            </label>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
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
=======
          Team Members
        </h3>
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5

        {students.map((student, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              backgroundColor: "#f0f4f8",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid rgb(29, 70, 111)",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Member {index + 1} Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={student.name}
                onChange={(e) =>
                  setStudents([
                    ...students.slice(0, index),
                    { ...student, name: e.target.value },
                    ...students.slice(index + 1),
                  ])
                }
                required
                style={inputStyle}
              />
            </div>
<<<<<<< HEAD
          ))} */}
=======
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5

            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Member {index + 1} Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={student.email}
                onChange={(e) =>
                  setStudents([
                    ...students.slice(0, index),
                    { ...student, email: e.target.value },
                    ...students.slice(index + 1),
                  ])
                }
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Course:</label>
              <input
                type="text"
                placeholder="Enter Course"
                value={student.course}
                onChange={(e) =>
                  setStudents([
                    ...students.slice(0, index),
                    { ...student, course: e.target.value },
                    ...students.slice(index + 1),
                  ])
                }
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Member {index + 1} ID:</label>
              <input
                type="text"
                placeholder="Enter ID"
                value={student.studentId}
                onChange={(e) =>
                  setStudents([
                    ...students.slice(0, index),
                    { ...student, studentId: e.target.value },
                    ...students.slice(index + 1),
                  ])
                }
                required
                style={inputStyle}
              />
            </div>
          </div>
        ))}

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <button
            type="button"
            onClick={handleAddMember}
            style={buttonStyle}
          >
            + Add Member
          </button>

          <button
            type="submit"
            style={{ ...buttonStyle, marginLeft: "10px" }}
          >
            Register Team
          </button>
<<<<<<< HEAD
        </form>
      </div>
    // </div>
    // </form>
    // </div>
    );
};

const styles = {
  container: { padding: "20px" },
  heading: { fontSize: "24px", color: "rgb(29, 70, 111)", marginBottom: "20px",  },
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
=======
        </div>
      </form>
    </div>
  );
>>>>>>> 69d42d8e545ce1b0056ad2d888f165cd3be582e5
};

const labelStyle = {
  fontWeight: "bold",
  display: "block",
  marginBottom: "5px",
  color: "rgb(29, 70, 111)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid rgb(29, 70, 111)",
  backgroundColor: "#fff",
  color: "black",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "rgb(29, 70, 111)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
};

export default TeamRegister;
