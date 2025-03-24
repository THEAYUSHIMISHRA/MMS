// ProfileSection.js
import React from 'react';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles'; // Import styled components from ProfileSectionStyles.js

const ProfileSection = () => {
  // Sample student profile data
  const studentProfile = {
    name: 'Himani Dobriyal',
    age: 21,
    cardID: 'BTBTI22141',
    rollNo: 2216830,
    email: 'himanibobriyal8@gmail.com'
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfo>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{studentProfile.name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Age:</Label>
            <Value>{studentProfile.age}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>cardID:</Label>
            <Value>{studentProfile.cardID}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Roll No:</Label>
            <Value>{studentProfile.rollNo}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email:</Label>
            <Value>{studentProfile.email}</Value>
          </ProfileDetail>
        </ProfileInfo>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
