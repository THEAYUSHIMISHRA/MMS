import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import styled, { ThemeProvider } from "styled-components";
import { FaMoon, FaSun, FaEdit, FaTrash } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  EventCalendarContainer,
  Content,
  CalendarContainer,
  Events,
  Event,
  AddEventForm,
  EventInput,
  AddEventButton,
  ErrorText,
} from "../../styles/EventCalendarStyles";

const lightTheme = {
  background: "#ffffff",
  color: "#333",
  buttonBg: "#007bff",
  buttonColor: "#fff",
  inputBg: "#fff",
  inputColor: "#000",
  calendarBg: "#fff",
  calendarText: "#000",
  eventBg: "#f8f9fa",
  eventText: "#000",
};

const darkTheme = {
  background: "#222",
  color: "#fff",
  buttonBg: "#444",
  buttonColor: "#ddd",
  inputBg: "#333",
  inputColor: "#fff",
  calendarBg: "#333",
  calendarText: "#fff",
  eventBg: "#444",
  eventText: "#fff",
};

const ThemeWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: 0.3s;
`;

const StyledCalendar = styled(Calendar)`
  background: ${(props) => props.theme.calendarBg};
  color: ${(props) => props.theme.calendarText};
  border-radius: 5px;
  padding: 10px;
  .react-calendar__tile {
    color: ${(props) => props.theme.calendarText} !important;
  }
  .react-calendar__navigation button {
    color: ${(props) => props.theme.calendarText} !important;
  }
`;

const StyledEvent = styled(Event)`
  background: ${(props) => props.theme.eventBg};
  color: ${(props) => props.theme.eventText};
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
`;

const ToggleTheme = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/events/getall");
        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events");
      }
    };
    fetchEvents();
  }, []);

  const addOrUpdateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.trim()) {
      setError("Event cannot be empty");
      return;
    }
    try {
      let updatedEvents;
      if (editingIndex !== null) {
        updatedEvents = events.map((event, index) =>
          index === editingIndex ? { text: newEvent, date: date.toISOString() } : event
        );
        setEditingIndex(null);
      } else {
        updatedEvents = [...events, { text: newEvent, date: date.toISOString() }];
      }
      setEvents(updatedEvents);
      setNewEvent("");
      setError(null);
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Error adding event");
    }
  };

  const deleteEvent = async (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const editEvent = (index) => {
    setNewEvent(events[index].text);
    setEditingIndex(index);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ThemeWrapper>
        <EventCalendarContainer>
          <Sidebar />
          <Content>
            <ToggleTheme onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </ToggleTheme>
            <h1>Event Calendar</h1>
            <p>Manage and track your upcoming events.</p>
            <div>
              <strong>Current Time:</strong> {new Date().toLocaleString()}
            </div>
            <CalendarContainer>
              <h2>Select Date</h2>
              <StyledCalendar onChange={setDate} value={date} theme={darkMode ? darkTheme : lightTheme} />
            </CalendarContainer>
            <AddEventForm onSubmit={addOrUpdateEvent}>
              <h2>{editingIndex !== null ? "Edit Event" : "Create a New Event"}</h2>
              <EventInput
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                placeholder="Enter Event Title"
              />
              <AddEventButton type="submit">{editingIndex !== null ? "Update Event" : "Add Event"}</AddEventButton>
            </AddEventForm>
            {error && <ErrorText>{error}</ErrorText>}
            <Events>
              <h2>Upcoming Events</h2>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <StyledEvent key={index}>
                    <strong>{event.text}</strong> - {new Date(event.date).toLocaleDateString()}
                    <FaEdit onClick={() => editEvent(index)} style={{ marginLeft: "10px", cursor: "pointer" }} />
                    <FaTrash onClick={() => deleteEvent(index)} style={{ marginLeft: "10px", cursor: "pointer", color: "red" }} />
                  </StyledEvent>
                ))
              ) : (
                <p>No events available</p>
              )}
            </Events>
          </Content>
        </EventCalendarContainer>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default EventSection;
