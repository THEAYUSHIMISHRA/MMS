// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from './Announcement';
import {
  StudentDashboardContainer,
  Content,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
  BottomContent,
} from '../../styles/DashboardStyles';

const StudentDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchStudentCount = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/students/count");
      setStudentCount(response.data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/students/upfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  useEffect(() => {
    const fetchAnnouncementCount = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/announcements/count");
        setAnnouncementCount(response.data.count);
      } catch (error) {
        console.error("Error fetching announcements count:", error);
      }
    };

    const fetchEventCount = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/events/count");
        setEventCount(response.data.count);
      } catch (error) {
        console.error("Error fetching events count:", error);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
        setAnnouncements(response.data.announcements || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchStudentCount();
    fetchAnnouncementCount();
    fetchAnnouncements();
    fetchEventCount();
  }, []);

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Students</CardTitle>
              <CardContent>{studentCount}</CardContent>
            </Card>
            <Card>
              <CardTitle>Announcements</CardTitle>
              <CardContent>{announcementCount}</CardContent>
            </Card>
            <Card>
              <CardTitle>Events</CardTitle>
              <CardContent>{eventCount}</CardContent>
            </Card>
            <Card>
              <CardTitle>Upload Files</CardTitle>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileChange}
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  border: '3px solid rgb(0, 38, 102)',  // dark blue border in RGB
                  borderRadius: '5px',
                  width: '100%',
                  backgroundColor: 'white',            // white card background
                  fontFamily: 'inherit',
                  width: 'calc(100% - 20px)',
                  boxSizing: 'border-box'
                }}
                
              />
              <button
                onClick={handleUpload}
                style={{
                  marginTop: '10px',
                  padding: '10px 16px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
              >
                Upload
              </button>
            </Card>
          </CardContainer>
        </Section>

        <BottomContent>
          <Announcement announcements={announcements} />
        </BottomContent>
      </Content>
    </StudentDashboardContainer>
  );
};

export default StudentDashboard;
