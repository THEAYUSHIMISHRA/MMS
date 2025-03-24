// TeacherProfileSection.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { ProfileContainer, SidebarContainer, Content, ProfileHeader, ProfileDetails, ProfileLabel, ProfileInfo, EditButton } 
from '../../styles/SettingsProfileStyles'; 

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    name: 'Himani Dobriyal',
    email: 'himanidobriyal8@gmail.com',
    phone: '1230456078',
  });

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          <ProfileLabel>Name:</ProfileLabel>
          <ProfileInfo>{teacherInfo.name}</ProfileInfo>
          <ProfileLabel>Email:</ProfileLabel>
          <ProfileInfo>{teacherInfo.email}</ProfileInfo>
          <ProfileLabel>Phone:</ProfileLabel>
          <ProfileInfo>{teacherInfo.phone}</ProfileInfo>
        </ProfileDetails>
        <EditButton>Edit Profile</EditButton>
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;
