"use client";
import "../css/schedule.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState, useRef } from 'react';
import SectionTitle from "../components/title";
import useIsMobile from '../../lib/use_is_mobile';
import SvgTiler from '../components/svg-tiler';

export default function Schedule() {
    // Update this in one place when the event date changes (YYYY-MM-DD).
    const EVENT_DATE = '2026-09-26';
    const [activeDay, setActiveDay] = useState('Day 1');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const timelineRef = useRef(null);
    const currentEventRef = useRef(null);
    const [currentEventIndex, setCurrentEventIndex] = useState(-1);
    const isMobile = useIsMobile();
    
    // Schedule Data for Day 1
    const day1Schedule = [
        { time: '7:30 AM', endTime: '8:00 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '8:00 AM', endTime: '8:15 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '8:15 AM', endTime: '8:30 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '10:00 AM', endTime: '11:00 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '12:00 PM', endTime: '1:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '1:00 PM', endTime: '3:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '3:00 PM', endTime: '4:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '6:00 PM', endTime: '7:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '7:00 PM', endTime: '8:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '8:00 PM', endTime: '9:00 PM', event: 'TBD', location: 'TBD', type: 'event' }
    ];

    // Schedule Data for Day 2
    const day2Schedule = [
        { time: '8:00 AM', endTime: '9:00 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '9:00 AM', endTime: '11:00 AM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '11:00 AM', endTime: '12:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '12:00 PM', endTime: '1:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '1:00 PM', endTime: '2:30 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '2:30 PM', endTime: '4:00 PM', event: 'TBD', location: 'TBD', type: 'event' },
        { time: '4:00 PM', endTime: '5:00 PM', event: 'TBD', location: 'TBD', type: 'event' }
    ];

        //mini Hackathon schedule
    //     const scheduleData = [
    //     { time: '7:30 AM', endTime: '8:00 AM', event: 'TBD', location: 'TBD'},
    //     { time: '8:00 AM', endTime: '8:15 AM', event: 'TBD', location: 'TBD' },
    //     { time: '8:15 AM', endTime: '8:30 AM', event: 'TBD', location: 'TBD' },
    //     { time: '10:00 AM', endTime: '11:00 AM', event: 'TBD', location: 'TBD'},
    //     { time: '12:00 PM', endTime: '1:00 PM', event: 'TBD', location: 'TBD' },
    //     { time: '1:00 PM', endTime: '3:00 PM', event: 'TBD', location: 'TBD' },
    //     { time: '3:00 PM', endTime: '4:00 PM', event: 'TBD', location: 'TBD' },
    //     { time: '6:00 PM', endTime: '7:00 PM', event: 'TBD', location: 'TBD' },
    //     { time: '7:00 PM', endTime: '8:00 PM', event: 'TBD', location: 'TBD' },
    //     { time: '8:00 PM', endTime: '9:00 PM', event: 'TBD', location: 'TBD' },
    // ];

    const currentSchedule = activeDay === 'Day 1' ? day1Schedule : day2Schedule;

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
    
    useEffect(() => {
        AOS.refresh();
    }, [activeDay]);

    // scroll to current event when it changes
    useEffect(() => {
        if(currentEventRef.current) 
        {
            const element = currentEventRef.current;
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [currentEventIndex, activeDay]);
    
    // helper function to check if an event is currently happening
    const isCurrentEvent = (startTime, endTime) => {
        if(!startTime || !endTime) return false;
        
        const now = currentDateTime;
        const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        // Check if today is the event date
        if(todayKey === EVENT_DATE) 
        {
            const [startHour, startMinutes] = getTimeComponents(startTime);
            const [endHour, endMinutes] = getTimeComponents(endTime);
            
            const eventStart = new Date(now);
            eventStart.setHours(startHour);
            eventStart.setMinutes(startMinutes);
            
            const eventEnd = new Date(now);
            eventEnd.setHours(endHour);
            eventEnd.setMinutes(endMinutes);
            
            return now >= eventStart && now <= eventEnd;
        }
        
        return false;
    };

    // Keep state updates out of render to avoid React re-render crashes.
    useEffect(() => {
        const currentIndex = currentSchedule.findIndex((item) =>
            isCurrentEvent(item.time, item.endTime)
        );
        setCurrentEventIndex(currentIndex);
    }, [currentDateTime, activeDay]);
    
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

    const renderTimeline = () => {
    return (
        <div className="timeline-container" ref={timelineRef}>
            <div className="timeline">
                {currentSchedule.map((item, index) => {
                        const isCurrentlyHappening = isCurrentEvent(item.time, item.endTime);
                        const eventType = getEventType(item.event);
                        
                        return (
                            <div 
                                key={`${activeDay}-${index}`}
                                className="timeline-item"
                                ref={isCurrentlyHappening ? currentEventRef : null}
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
                                        <div className="timeline-card-meta">
                                            <span className={`timeline-card-type ${eventType.toLowerCase()}`}>
                                                {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                                            </span>
                                            {isCurrentlyHappening && (
                                                <span className="timeline-card-live-badge">HAPPENING NOW</span>
                                            )}
                                        </div>
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
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
        }}>
            <div className="schedule-content">
                <div className="schedule-section-title" data-aos="fade-up">
                    <SectionTitle title="SCHEDULE"/>
                </div>
                
              {  <div className="schedule-day-switch" data-aos="fade-up">
                    <button 
                        className={`tab-button ${activeDay === 'Day 1' ? 'active-tab' : ''}`} 
                        onClick={() => setActiveDay('Day 1')}
                    >
                        Day 1
                    </button>
                    <button 
                        className={`tab-button ${activeDay === 'Day 2' ? 'active-tab' : ''}`} 
                        onClick={() => setActiveDay('Day 2')}
                    >
                        Day 2
                    </button>
                </div> }
                
                {renderTimeline()}
                
                <div className="timeline-help-text" data-aos="fade-up">
                    Scroll horizontally, swipe, or hold middle mouse button and drag, to see all events
                </div>
            </div>
        </div>    
    );
}    