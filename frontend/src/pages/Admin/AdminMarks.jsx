import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Or SidebarAdmin if you have a separate one
import axios from "axios";

const AdminMarks = () => {
  const [students, setStudents] = useState([]);
  const [adminMarks, setAdminMarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/students/getall");
      setStudents(res.data.students);
      initializeAdminMarks(res.data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const initializeAdminMarks = (students) => {
    const initial = students.map((student) => ({
      id: student._id,
      name: student.name,
      presentation: 0,
      report: 0,
      finalMarks: 0,
    }));
    setAdminMarks(initial);
  };

  const handleChange = (id, field, value) => {
    const updated = adminMarks.map((entry) =>
      entry.id === id ? { ...entry, [field]: Number(value) } : entry
    );
    setAdminMarks(updated);
  };

  const handleSubmit = async () => {
    try {
      const formattedData = adminMarks.map(({ id, ...rest }) => ({
        student: id,
        ...rest,
      }));

      const res = await axios.post("http://localhost:4000/api/v1/admin/marks", {
        adminMarks: formattedData,
      });

      alert("Admin marks submitted successfully!");
      console.log("Admin Marks:", res.data);
    } catch (err) {
      console.error("Error submitting admin marks:", err);
    }
  };

  // Search filter logic
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "250px", // Match sidebar width
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1d325a",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Marks Entry
        </h2>

        {/* Search Bar */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by student name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px 15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "300px",
              maxWidth: "90%",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>

        {filteredStudents.map((student, index) => (
          <React.Fragment key={student._id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                padding: "15px",
                backgroundColor: "#eef1f6",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  minWidth: "160px",
                  fontWeight: 600,
                  color: "#333",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                {student.name}
              </span>

              {[
                { label: "Presentation", field: "presentation" },
                { label: "Report", field: "report" },
                { label: "Final Marks", field: "finalMarks" },
              ].map(({ label, field }) => (
                <div key={field} style={{ margin: "0 10px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={adminMarks.find((d) => d.id === student._id)?.[field] || ""}
                    onChange={(e) =>
                      handleChange(student._id, field, e.target.value)
                    }
                    style={{
                      width: "60px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </div>

            {index !== filteredStudents.length - 1 && (
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #ccc",
                  margin: "10px 0",
                }}
              />
            )}
          </React.Fragment>
        ))}

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "rgb(29, 50, 90)",
            color: "white",
            fontSize: "16px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            alignSelf: "center",
            display: "block",
            margin: "30px auto 0",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(23, 40, 75)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(29, 50, 90)")}
        >
          Submit Marks
        </button>
      </div>
    </div>
  );
};

export default AdminMarks;
