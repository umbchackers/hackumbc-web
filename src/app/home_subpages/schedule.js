"use client";
import "../css/schedule.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState } from 'react';
import SectionTitle from "../components/title";

export default function Schedule() {
    const [activeDay, setActiveDay] = useState('September 28th');  

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const renderSchedule = () => {
        if (activeDay === 'September 28th') {
            return (
                <tbody className="text-blue-900">   
                    {/*September 28th Schedule*/}
                    <tr>
                        <td className="border-b py-3 px-6">9:00am</td>
                        <td className="border-b py-3 px-6">Check-in Begins</td>
                        <td className="border-b py-3 px-6">ITE Atrium</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">10:00am</td>
                        <td className="border-b py-3 px-6">Opening Ceremony</td>
                        <td className="border-b py-3 px-6">ITE 104/102</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">11:00am</td>
                        <td className="border-b py-3 px-6">Sponsorship Networking</td>
                        <td className="border-b py-3 px-6">ENGR Atrium</td>
                    </tr>
                    <tr style={{ backgroundColor: '#d9ead3' }}>
                        <td className="border-b py-3 px-6">12:00pm</td>
                        <td className="border-b py-3 px-6">Hacking Begins!</td>
                        <td className="border-b py-3 px-6">ITE/ENGR</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ddc9ff' }}>
                        <td className="border-b py-3 px-6">12:30pm</td>
                        <td className="border-b py-3 px-6">LUNCH</td>
                        <td className="border-b py-3 px-6">ENGR ATRIUM</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">1:00pm</td>
                        <td className="border-b py-3 px-6">T.Rowe Price Sponsored Talk</td>
                        <td className="border-b py-3 px-6">ITE 104</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">1:30pm</td>
                        <td className="border-b py-3 px-6">Nightwing Sponsored Talk</td>
                        <td className="border-b py-3 px-6">ITE 104</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">2:15pm</td>
                        <td className="border-b py-3 px-6">Intro to React Workshop/ Game Dev Workshop</td>
                        <td className="border-b py-3 px-6">ITE 456/ITE 233</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">3:00pm</td>
                        <td className="border-b py-3 px-6">Nightwing Workshop: "Hack My Hat"</td>
                        <td className="border-b py-3 px-6">ITE 233</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">3:45pm</td>
                        <td className="border-b py-3 px-6">GDSC Workshop / Cybersecurity for Beginners: CyberDawgs Workshop</td>
                        <td className="border-b py-3 px-6">ITE 233/ITE 456</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">4:30pm</td>
                        <td className="border-b py-3 px-6">Booz Allen Workshop/ SWE</td>
                        <td className="border-b py-3 px-6">ITE 233/ITE 456</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">5:15pm</td>
                        <td className="border-b py-3 px-6">Linux Users Group Workshop/ Resume Review & Creation Workshop</td>
                        <td className="border-b py-3 px-6">ITE 233/ITE 456</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ddc9ff' }}>
                        <td className="border-b py-3 px-6">6:00pm</td>
                        <td className="border-b py-3 px-6">DINNER</td>
                        <td className="border-b py-3 px-6">TBD</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">8:00pm</td>
                        <td className="border-b py-3 px-6">Smash Tournament</td>
                        <td className="border-b py-3 px-6">ITE 233</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">8:30pm</td>
                        <td className="border-b py-3 px-6">MLH</td>
                        <td className="border-b py-3 px-6">ITE 456</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">9:30pm</td>
                        <td className="border-b py-3 px-6">Spaghetti Tower Competition</td>
                        <td className="border-b py-3 px-6">ITE 456</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">10:00pm</td>
                        <td className="border-b py-3 px-6">Late Night Snack</td>
                        <td className="border-b py-3 px-6">ITE Second Floor</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">11:00pm</td>
                        <td className="border-b py-3 px-6">Just Dance Session</td>
                        <td className="border-b py-3 px-6">ITE 456</td>
                    </tr>
                </tbody>
            );
        } else if (activeDay === 'September 29th') {
            return (
                <tbody className="text-blue-900">
                    {/*September 29th schedule*/}
                    <tr style={{ backgroundColor: '#ddc9ff' }}>
                        <td className="border-b py-3 px-6">9:00am</td>
                        <td className="border-b py-3 px-6">BREAKFAST</td>
                        <td className="border-b py-3 px-6">ENGR ATRIUM</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">11:00am</td>
                        <td className="border-b py-3 px-6">Begin Hack Submissions!</td>
                        <td className="border-b py-3 px-6">ITE Second Floor</td>
                    </tr>
                    <tr style={{ backgroundColor: '#d9ead3' }}>
                        <td className="border-b py-3 px-6">12:00pm</td>
                        <td className="border-b py-3 px-6">Hacking Ends!</td>
                        <td className="border-b py-3 px-6">ITE Second Floor</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">12:30pm</td>
                        <td className="border-b py-3 px-6">Submissions End</td>
                        <td className="border-b py-3 px-6">ITE Second Floor</td>
                    </tr>
                    <tr style={{ backgroundColor: '#ddc9ff' }}>
                        <td className="border-b py-3 px-6">1:00pm</td>
                        <td className="border-b py-3 px-6">LUNCH</td>
                        <td className="border-b py-3 px-6">ENGR ATRIUM</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">2:00pm</td>
                        <td className="border-b py-3 px-6">Expo Begins</td>
                        <td className="border-b py-3 px-6">UC Ballroom</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">3:30pm</td>
                        <td className="border-b py-3 px-6">Expo Ends</td>
                        <td className="border-b py-3 px-6">UC Ballroom</td>
                    </tr>
                    <tr>
                        <td className="border-b py-3 px-6">4:00pm</td>
                        <td className="border-b py-3 px-6">Closing Ceremony</td>
                        <td className="border-b py-3 px-6">UC Ballroom</td>
                    </tr>
                </tbody>
            );
        }
    };

    return (
        <div className="schedule-page [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div className="schedule-content">
                <div className="schedule-section-title light-mode-text" data-aos="fade-up">
                    <SectionTitle title="SCHEDULE"/>
                </div>
                <div className="schedule-title-subheading light-mode-text" data-aos="fade-up">
                    hackUMBC 2024 Schedule
                </div>
                    {/*table*/}
                    <div className="overflow-x-hidden mt-4" data-aos="fade-up">
                    <table className="overflow-x-hidden min-w-full bg-blue-50 text-center justify-center text-sm shadow-md">
                    <thead className="bg-purple-950 text-white uppercase text-md">
                        <tr>
                            <th colSpan="3" className="py-3 px-6">
                                <div className="schedule-day-switch tab-nav">
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
                            </th>
                        </tr>
                        <tr>
                            <th className="py-3 px-6">Time</th>
                            <th className="py-3 px-6">Event</th>
                            <th className="py-3 px-6">Location</th>
                        </tr>
                    </thead>
                    {renderSchedule()}
                    </table>
                </div>
            </div>
        </div>    
    );
}    