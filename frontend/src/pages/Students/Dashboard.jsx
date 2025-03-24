// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Announcement from './Announcement';
import { StudentDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent, BottomContent } 
from '../../styles/DashboardStyles';

const StudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
    //const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
    const [studentPerformance, setStudentPerformance] = useState([]);
  useEffect(() => {
      fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
        setAnnouncements(response.data.announcements || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

  return (
    <StudentDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Attendence</CardTitle>
              <CardContent>0</CardContent>
            </Card>
            <Card>
              <CardTitle>Team Members</CardTitle>
              <CardContent>0</CardContent>
            </Card>
            <Card>
              <CardTitle>Project</CardTitle>
              <CardContent>0</CardContent>
            </Card>
          </CardContainer>
        </Section>

        {/* <Section>
          <SectionTitle>Announcements</SectionTitle> */}
          {/* <Performance studentPerformance={studentPerformance} /> */}
          {/* <Announcement announcements={announcements} /> */}
          {/* Add a list of recent activity items */}
        {/* </Section> */}

        <BottomContent>
          {/* <Performance studentPerformance={studentPerformance} /> */}
          <Announcement announcements={announcements} />
        </BottomContent>

        {/* <Section> */}
          {/* <SectionTitle>Upcoming Events</SectionTitle> */}
          {/* Add a calendar or list of upcoming events */}
        {/* </Section> */}

        {/* Add more sections for other parts of the admin dashboard */}
      </Content>
    </StudentDashboardContainer> 
  );
};

export default StudentDashboard;
