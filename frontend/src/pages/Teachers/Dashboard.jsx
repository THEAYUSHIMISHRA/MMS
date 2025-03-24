// TeacherDashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { TeacherDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';

const TeacherDashboard = () => {
  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Total Teams</CardTitle>
              <CardContent>0</CardContent>
            </Card>
            <Card>
              <CardTitle>Total Students</CardTitle>
              <CardContent>0</CardContent>
            </Card>
            <Card>
              <CardTitle>Messages</CardTitle>
              <CardContent>0</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Announcements</SectionTitle>
          {/* Add a list of recent activity items */}
        </Section>

        {/* <Section>
          <SectionTitle>Upcoming Events</SectionTitle> */}
          {/* Add a calendar or list of upcoming events */}
        {/* </Section> */}

        {/* Add more sections for other parts of the admin dashboard */}
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;
