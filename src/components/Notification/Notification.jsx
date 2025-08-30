import { useEffect, useState } from "react";
import Navbar from "components/Navbar/Navbar.jsx";
import './Notification.css'

const Notification = ({ children }) => {
    // State variables to manage user authentication, username, doctor data, and appointment data
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null)
    // useEffect hook to perform side effects in the component
    useEffect(() => {
        // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
        const storedUsername = sessionStorage.getItem('name');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem(storedUsername));
        // Set isLoggedIn state to true and update username if storedUsername exists
        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
        // Set doctorData state if storedDoctorData exists
        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }
        // Set appointmentData state if storedAppointmentData exists
        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }
    }, []); // Empty dependency array ensures useEffect runs only once after initial render
    // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
    return (
        <div>
            <Navbar />
            {children}
            {isLoggedIn && appointmentData && (
                <>
                    <div className="appointment-card">
                        <div className="appointment-card__content">
                            {/* Display title for appointment details */}
                            <h3 className="appointment-card__title">Appointment Details</h3>
                            <p className="appointment-card__message">
                                <strong>Doctor:</strong> {appointmentData?.doctorName}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Speciality:</strong> {appointmentData?.doctorSpeciality}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Name:</strong> {appointmentData?.name}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Date of Appointment:</strong> {appointmentData?.datetime}
                            </p>
                            <p className="appointment-card__message">
                                <strong>Time Slot:</strong> {appointmentData?.timeSlot}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Notification;
