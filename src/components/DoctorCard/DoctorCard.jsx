import React, { useEffect, useMemo, useState } from "react";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from 'uuid';
import './DoctorCard.css'
import DoctorAvatar from '@/assets/doctor-card-avatar.png'
import AppointmentForm from "components/AppointmentForm/AppointmentForm.jsx";

function DoctorCard({name, speciality, experience, ratings, profilePic}) {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [bookingInfo,setBookingInfo] = useState()

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        localStorage.removeItem('doctorData')
        localStorage.removeItem(name)
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData,
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        localStorage.setItem('doctorData', JSON.stringify(updatedAppointments));
        const userName = sessionStorage.getItem('name');
        localStorage.setItem(userName, JSON.stringify(newAppointment));
        setShowModal(false);
    };

    useEffect(() => {
        const userName = sessionStorage.getItem('name');
        const doctorData = JSON.parse(localStorage.getItem('doctorData'));
        setAppointments(doctorData || []);
        const bookingData = JSON.parse(localStorage.getItem(userName))
        bookingData && setBookingInfo({...bookingData});
    }, []);

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    <img src={DoctorAvatar} alt=""/>
                </div>
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
                {/*<div className="doctor-card-bookings">
                    <button className='book-appointment-btn'>
                        <div>Book Appointment</div>
                        <div>No Booking Fee</div>
                    </button>
                </div>*/}
            </div>

            <div className="doctor-card-options-container">
                <Popup
                    style={{backgroundColor: '#FFFFFF'}}
                    trigger={
                        <div className="doctor-card-bookings">
                            <button
                                className={`book-appointment-btn ${bookingInfo?.doctorName === name ? 'cancel-appointment' : ''}`}>
                                {bookingInfo ? (
                                    <div>Cancel Appointment</div>
                                ) : (
                                    <div>Book Appointment</div>
                                )}
                                <div>No Booking Fee</div>
                            </button>
                        </div>
                    }
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    {(close) => (
                        <div className="doctorbg" style={{height: '80vh', overflow: 'scroll'}}>
                            <div>
                                <div className="doctor-card-profile-image-container">
                                    <img src={DoctorAvatar} alt=""/>
                                </div>
                                <div className="doctor-card-details">
                                    <div className="doctor-card-detail-name">{name}</div>
                                    <div className="doctor-card-detail-speciality">{speciality}</div>
                                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                                </div>
                            </div>

                            {appointments.length > 0 ? (
                                <>
                                    <h3 style={{textAlign: 'center',marginBottom: '30px'}}>Appointment Booked!</h3>
                                    {appointments.map((appointment) => (
                                        <div className="bookedInfo" key={appointment.id}>
                                            <div className="bookedInfo-list">
                                                <p>Name: {appointment.name}</p>
                                                <p>Phone Number: {appointment.phoneNumber}</p>
                                                <p>Date of Appointment: {appointment.datetime}</p>
                                                <p>Time slot: {appointment.timeSlot}</p>
                                            </div>
                                            <div className="bookedInfo-buttons">
                                                <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <AppointmentForm doctorName={name} doctorSpeciality={speciality}
                                                 onSubmit={handleFormSubmit}/>
                            )}
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}

export default DoctorCard
