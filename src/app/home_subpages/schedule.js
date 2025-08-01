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
        
        // update current time every minute
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 60000);
        
        return () => clearInterval(timer);
    }, []);
    
    // scroll to current event when it changes
    useEffect(() => {
        if(currentEventRef.current) 
        {
            const element = currentEventRef.current;
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [currentEventIndex, activeDay]);
    
    // helper function to check if an event is currently happening
    const isCurrentEvent = (startTime, endTime, eventDate, index) => {
        if(!startTime || !endTime || !eventDate) return false;
        
        const now = currentDateTime;
        const today = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        
        // Check if today is the event date
        if(today.includes(eventDate.replace('September', 'Sep').replace('th', ''))) 
        {
            const [startHour, startMinutes] = getTimeComponents(startTime);
            const [endHour, endMinutes] = getTimeComponents(endTime);
            
            const eventStart = new Date(now);
            eventStart.setHours(startHour);
            eventStart.setMinutes(startMinutes);
            
            const eventEnd = new Date(now);
            eventEnd.setHours(endHour);
            eventEnd.setMinutes(endMinutes);
            
            const isCurrentlyHappening = now >= eventStart && now <= eventEnd;
            
            // set currentEventIndex if this event is happening now
            if(isCurrentlyHappening) 
            {
                setCurrentEventIndex(index);
            }
            
            return isCurrentlyHappening;
        }
        
        return false;
    };
    
    // helper to convert time strings (9:00am) to hours and minutes
    const getTimeComponents = (timeString) => {
        const isPM = timeString.toLowerCase().includes('pm');
        let [hours, minutes] = timeString
            .toLowerCase()
            .replace('am', '')
            .replace('pm', '')
            .split(':')
            .map(Number);
        
        if(isPM && hours !== 12) hours += 12;
        if(!isPM && hours === 12) hours = 0;
        
        return [hours, minutes || 0];
    };
    
    // get event type to apply appropriate styling
    const getEventType = (eventTitle) => {
        const title = eventTitle.toLowerCase();
        if(title.includes('lunch') || title.includes('breakfast') || title.includes('dinner') || title.includes('snack')) 
        {
            return 'food';
        } 
        else if (title.includes('workshop') || title.includes('talk')) 
        {
            return 'workshop';
        } 
        else if(title.includes('competition') || title.includes('tournament') || title.includes('contest')) 
        {
            return 'competition';
        } 
        else 
        {
            return 'event';
        }
    };

    // format time to be more readable
    const formatTime = (time) => {
        return time.replace(/([0-9]+)([ap]m)/i, '$1 $2');
    };

    // schedule data for day 1
    const day1Schedule = [
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' }
    ];

    // schedule data for day 2
    const day2Schedule = [
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
        { time: 'TBD', endTime: 'TBD', event: 'TBD', location: 'TBD' },
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
                                        <span className="time-separator">to</span>
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
            backgroundImage: "url('/hackumbc_bg.webp')",
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
                        Day 1
                    </button>
                    <button 
                        className={`tab-button ${activeDay === 'September 29th' ? 'active-tab' : ''}`} 
                        onClick={() => setActiveDay('September 29th')}
                    >
                        Day 2
                    </button>
                </div>
                
                {renderTimeline()}
                
                <div className="timeline-help-text" data-aos="fade-up">
                    Scroll horizontally, swipe, or hold middle mouse button and drag, to see all events
                </div>
            </div>
        </div>    
    );
}    