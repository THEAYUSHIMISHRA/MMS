import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/students/getall");
      setStudents(res.data.students);
      initializeMarksData(res.data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const initializeMarksData = (students) => {
    const initial = students.map((student) => ({
      id: student._id,
      name: student.name,
      srsSds: 0,
      presentation: 0,
      internal1: 0,
      internal2: 0,
      finalInternal: 0,
      report: 0,
      attendance: 0,
    }));
    setMarksData(initial);
  };

  const handleChange = (id, field, value) => {
    const updated = marksData.map((entry) =>
      entry.id === id ? { ...entry, [field]: Number(value) } : entry
    );
    setMarksData(updated);
  };

  const handleSubmit = async () => {
    try {
      const formattedData = marksData.map(({ id, ...rest }) => ({
        student: id,
        ...rest,
      }));

      const res = await axios.post("http://localhost:4000/api/v1/marks", {
        marksData: formattedData,
      });

      alert("Marks submitted successfully!");
      console.log("Marks submitted:", res.data);
    } catch (err) {
      console.error("Error submitting marks:", err);
    }
  };

  // Search filter logic
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "250px", // Ensures content is not hidden behind sidebar
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1d325a",
              textAlign: "center",
              marginBottom: "20px",
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

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
                    { label: "SRS/SDS", field: "srsSds" },
                    { label: "Presentation", field: "presentation" },
                    { label: "Internal 1", field: "internal1" },
                    { label: "Internal 2", field: "internal2" },
                    { label: "Final Internal", field: "finalInternal" },
                    { label: "Report", field: "report" },
                    { label: "Attendance", field: "attendance" },
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
                        value={marksData.find((d) => d.id === student._id)?.[field] || ""}
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
          </div>

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
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(23, 40, 75)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(29, 50, 90)")}
          >
            Submit Marks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marks;
