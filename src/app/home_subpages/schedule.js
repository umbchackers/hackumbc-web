"use client";
import "../css/schedule.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState, useRef } from 'react';
import SectionTitle from "../components/title";

export default function Schedule() {
    const [activeDay, setActiveDay] = useState('September 28th');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const timelineRef = useRef(null);
    const currentEventRef = useRef(null);
    const [currentEventIndex, setCurrentEventIndex] = useState(-1);
    
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
        AOS.refresh();
        
        // Update current time every minute
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 60000);
        
        return () => clearInterval(timer);
    }, []);
    
    // Scroll to current event when it changes
    useEffect(() => {
        if (currentEventRef.current) {
            const element = currentEventRef.current;
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [currentEventIndex, activeDay]);
    
    // Helper function to check if an event is currently happening
    const isCurrentEvent = (startTime, endTime, eventDate, index) => {
        if (!startTime || !endTime || !eventDate) return false;
        
        const now = currentDateTime;
        const today = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        
        // Check if today is the event date
        if (today.includes(eventDate.replace('September', 'Sep').replace('th', ''))) {
            const [startHour, startMinutes] = getTimeComponents(startTime);
            const [endHour, endMinutes] = getTimeComponents(endTime);
            
            const eventStart = new Date(now);
            eventStart.setHours(startHour);
            eventStart.setMinutes(startMinutes);
            
            const eventEnd = new Date(now);
            eventEnd.setHours(endHour);
            eventEnd.setMinutes(endMinutes);
            
            const isCurrentlyHappening = now >= eventStart && now <= eventEnd;
            
            // Set currentEventIndex if this event is happening now
            if (isCurrentlyHappening) {
                setCurrentEventIndex(index);
            }
            
            return isCurrentlyHappening;
        }
        
        return false;
    };
    
    // Helper to convert time strings (9:00am) to hours and minutes
    const getTimeComponents = (timeString) => {
        const isPM = timeString.toLowerCase().includes('pm');
        let [hours, minutes] = timeString
            .toLowerCase()
            .replace('am', '')
            .replace('pm', '')
            .split(':')
            .map(Number);
        
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
        
        return [hours, minutes || 0];
    };
    
    // Get event type to apply appropriate styling
    const getEventType = (eventTitle) => {
        const title = eventTitle.toLowerCase();
        if (title.includes('lunch') || title.includes('breakfast') || title.includes('dinner') || title.includes('snack')) {
            return 'food';
        } else if (title.includes('workshop') || title.includes('talk')) {
            return 'workshop';
        } else if (title.includes('competition') || title.includes('tournament') || title.includes('contest')) {
            return 'competition';
        } else {
            return 'event';
        }
    };

    // Format time to be more readable
    const formatTime = (time) => {
        return time.replace(/([0-9]+)([ap]m)/i, '$1 $2');
    };

    // Schedule data for September 28th
    const day1Schedule = [
        { time: '9:00am', endTime: '10:00am', event: 'Check-in Begins', location: 'ITE Atrium' },
        { time: '10:00am', endTime: '11:00am', event: 'Opening Ceremony', location: 'ITE 104/102' },
        { time: '11:00am', endTime: '12:00pm', event: 'Sponsorship Networking', location: 'ENGR Atrium' },
        { time: '12:00pm', endTime: '12:30pm', event: 'Hacking Begins!', location: 'ITE/ENGR' },
        { time: '12:30pm', endTime: '1:00pm', event: 'LUNCH', location: 'ENGR ATRIUM' },
        { time: '1:00pm', endTime: '1:30pm', event: 'T.Rowe Price Sponsored Talk', location: 'ITE 104' },
        { time: '1:30pm', endTime: '2:15pm', event: 'Nightwing Sponsored Talk', location: 'ITE 104' },
        { time: '2:15pm', endTime: '3:00pm', event: 'Intro to React Workshop', location: 'ITE 456' },
        { time: '2:15pm', endTime: '3:00pm', event: 'Game Dev Workshop', location: 'ITE 233' },
        { time: '3:00pm', endTime: '3:45pm', event: 'Nightwing Workshop"', location: 'ITE 233' },
        { time: '3:45pm', endTime: '4:30pm', event: 'GDSC Workshop', location: 'ITE 233' },
        { time: '3:45pm', endTime: '4:30pm', event: 'Cybersecurity for Beginners', location: 'ITE 456' },
        { time: '4:30pm', endTime: '5:15pm', event: 'Booz Allen Workshop', location: 'ITE 233' },
        { time: '4:30pm', endTime: '5:15pm', event: 'SWE Workshop', location: 'ITE 456' },
        { time: '5:15pm', endTime: '6:00pm', event: 'Linux Users Group Workshop', location: 'ITE 233' },
        { time: '5:15pm', endTime: '6:00pm', event: 'Resume Review Workshop', location: 'ITE 456' },
        { time: '6:00pm', endTime: '8:00pm', event: 'DINNER', location: 'TBD' },
        { time: '8:00pm', endTime: '8:30pm', event: 'Smash Tournament', location: 'ITE 233' },
        { time: '8:30pm', endTime: '9:30pm', event: 'MLH', location: 'ITE 456' },
        { time: '9:30pm', endTime: '10:00pm', event: 'Spaghetti Tower Competition', location: 'ITE 456' },
        { time: '10:00pm', endTime: '11:00pm', event: 'Late Night Snack', location: 'ITE Second Floor' },
        { time: '11:00pm', endTime: '11:59pm', event: 'Just Dance Session', location: 'ITE 456' }
    ];

    // Schedule data for September 29th
    const day2Schedule = [
        { time: '9:00am', endTime: '11:00am', event: 'BREAKFAST', location: 'ENGR ATRIUM' },
        { time: '11:00am', endTime: '12:00pm', event: 'Begin Hack Submissions!', location: 'ITE Second Floor' },
        { time: '12:00pm', endTime: '12:30pm', event: 'Hacking Ends!', location: 'ITE Second Floor' },
        { time: '12:30pm', endTime: '1:00pm', event: 'Submissions End', location: 'ITE Second Floor' },
        { time: '1:00pm', endTime: '2:00pm', event: 'LUNCH', location: 'ENGR ATRIUM' },
        { time: '2:00pm', endTime: '3:30pm', event: 'Expo Begins', location: 'UC Ballroom' },
        { time: '3:30pm', endTime: '4:00pm', event: 'Expo Ends', location: 'UC Ballroom' },
        { time: '4:00pm', endTime: '5:00pm', event: 'Closing Ceremony', location: 'UC Ballroom' }
    ];

    const renderTimeline = () => {
        const scheduleData = activeDay === 'September 28th' ? day1Schedule : day2Schedule;
        
        return (
            <div className="timeline-container" ref={timelineRef}>
                <div className="timeline">
                    {scheduleData.map((item, index) => {
                        const isCurrentlyHappening = isCurrentEvent(item.time, item.endTime, activeDay, index);
                        const eventType = getEventType(item.event);
                        
                        return (
                            <div 
                                key={index} 
                                className="timeline-item"
                                ref={isCurrentlyHappening ? timelineRef : null}
                                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                                data-aos-delay={100 + (index * 30)}
                            >
                                <div className={`timeline-card ${isCurrentlyHappening ? 'current-event' : ''}`}>
                                    <div className="timeline-card-header">
                                        <span>{formatTime(item.time)}</span>
                                        <span>{formatTime(item.endTime)}</span>
                                    </div>
                                    <div className="timeline-card-content">
                                        <span className={`timeline-card-type ${eventType.toLowerCase()}`}>
                                            {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                                        </span>
                                        <h3 className="timeline-card-title">{item.event}</h3>
                                        <div className="timeline-card-location">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                            </svg>
                                            {item.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="schedule-page" style={{
            backgroundImage: "url('/hackumbc_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="schedule-content">
                <div className="schedule-section-title" data-aos="fade-up">
                    <SectionTitle title="SCHEDULE"/>
                </div>
                <div className="schedule-title-subheading" data-aos="fade-up">
                    hackUMBC 2025 Schedule
                </div>
                
                <div className="schedule-day-switch" data-aos="fade-up">
                    <button 
                        className={`tab-button ${activeDay === 'September 28th' ? 'active-tab' : ''}`} 
                        onClick={() => setActiveDay('September 28th')}
                    >
                        September 28th
                    </button>
                    <button 
                        className={`tab-button ${activeDay === 'September 29th' ? 'active-tab' : ''}`} 
                        onClick={() => setActiveDay('September 29th')}
                    >
                        September 29th
                    </button>
                </div>
                
                {renderTimeline()}
                
                <div className="timeline-help-text" data-aos="fade-up">
                    Scroll horizontally to see all events
                </div>
            </div>
        </div>    
    );
}    