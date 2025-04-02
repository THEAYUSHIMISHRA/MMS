// AnnouncementSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  SidebarContainer,
  Content,
  AnnouncementHeader,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementTitle,
  AnnouncementContent,
} from '../../styles/AnnouncementStyles'; 

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDownload = (file) => {
    if (!file || !file.data) {
      toast.error("File data is missing");
      return;
    }
  
    try {

      let fileData = file.data;

    // Check if Base64 data is missing "data:mimeType;base64,"
    if (!fileData.startsWith("data:")) {
      fileData = `data:${file.contentType};base64,${fileData}`;
    }

    // Open in a new tab
    const newTab = window.open();
    newTab.document.write(`<iframe src="${fileData}" width="100%" height="100%"></iframe>`);
    } catch (error) {
      toast.error('Error opening file');
      console.error('Download error:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <AnnouncementHeader>Announcements</AnnouncementHeader>
        <AnnouncementList>
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement._id}>
              <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
              {announcement.files.length > 0 ? (
                announcement.files.map((file, index) => (
                  <div key={index}>
                    <button onClick={() => handleDownload(file)}>
                      {file.filename} ({file.contentType})
                    </button>
                 </div>
                ))
              ) : (
                <p>------------------------------</p> // Debugging
              )}
            </AnnouncementItem>
          ))}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default AnnouncementSection;
