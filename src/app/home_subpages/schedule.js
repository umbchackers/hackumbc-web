"use client";
import "../css/schedule.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import SectionTitle from "../components/title";

export default function Schedule() {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <div className="schedule-page [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div className="schedule-content">
                <div className="schedule-section-title light-mode-text" data-aos="fade-up">
                    <SectionTitle title="Schedule" />
                </div>
                <div className="schedule-title-subheading light-mode-text" data-aos="fade-up">
                    hackUMBC 2024 Schedule
                </div>
                
                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full border-collapse bg-blue-50 text-center text-sm shadow-md rounded-lg">
                        <thead className="bg-purple-950 text-white uppercase text-md">
                            <tr>
                                <th className="py-3 px-6">Time</th>
                                <th className="py-3 px-6">Event</th>
                                <th className="py-3 px-6">Location</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-900">
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
                            <tr>
                                <td className="border-b py-3 px-6">12:00pm</td>
                                <td className="border-b py-3 px-6">Hacking Begins</td>
                                <td className="border-b py-3 px-6">ITE/ENGR</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">1:00pm</td>
                                <td className="border-b py-3 px-6">LUNCH</td>
                                <td className="border-b py-3 px-6">TBD</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">1:30pm</td>
                                <td className="border-b py-3 px-6">Intro to React Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">2:30pm</td>
                                <td className="border-b py-3 px-6">Intro to AI Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">3:00pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">3:30pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">4:00pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">4:30pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">5:00pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">5:30pm</td>
                                <td className="border-b py-3 px-6">Workshop</td>
                                <td className="border-b py-3 px-6">ITE 231/456</td>
                            </tr>
                            <tr>
                                <td className="border-b py-3 px-6">6:00pm</td>
                                <td className="border-b py-3 px-6">DINNER</td>
                                <td className="border-b py-3 px-6">TBD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>    
        </div>
    );
}
