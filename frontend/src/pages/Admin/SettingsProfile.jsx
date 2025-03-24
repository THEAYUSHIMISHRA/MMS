// SettingsProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileDetails,
  ProfileLabel,
  ProfileInfo,
  EditButton,
} from '../../styles/SettingsProfileStyles'; // Import styled components from SettingsProfileStyles.js

const SettingsProfile = () => {
  const [profile, setProfile] = useState(null);
  const adminEmail = localStorage.getItem("adminEmail"); // Retrieve email from localStorage

  useEffect(() => {

    if (!adminEmail) {
      console.error("No email found in localStorage.");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/users/admin/profile?email=${adminEmail}`);
        console.log("Profile Data from API:", res.data);
        setProfile(res.data.admin);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [adminEmail]);

  if (!profile) return <p>Loading this page...</p>;

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          <ProfileLabel>Email:</ProfileLabel>
          <ProfileInfo>{profile?.email}</ProfileInfo>

          <ProfileLabel>Name:</ProfileLabel>
          <ProfileInfo>{profile?.name}</ProfileInfo>
          
          <ProfileLabel>Phone:</ProfileLabel>
          <ProfileInfo>{profile?.phno}</ProfileInfo>

          {/* <ProfileLabel>Password:</ProfileLabel>
          <ProfileInfo>{profile.password}</ProfileInfo> */}

          {/* <ProfileLabel>Qualification:</ProfileLabel>
          <ProfileInfo>{profile.qualification}</ProfileInfo> */}
        </ProfileDetails>
        <EditButton>Edit Profile</EditButton>
      </Content>
    </ProfileContainer>
  );
};

export default SettingsProfile;
