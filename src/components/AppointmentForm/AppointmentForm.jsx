import React, { useEffect, useState } from "react";

import './AppointmentForm.css'

function AppointmentForm({ doctorName, doctorSpeciality, onSubmit }) {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [datetime, setDatetime] = useState('');
    const [timeSlot, setTimeSlot] = useState(null);

    const handleSlotSelection = (slot) => {
        setTimeSlot(slot.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({doctorName,doctorSpeciality, name, phoneNumber,datetime,timeSlot});
        setName('');
        setPhoneNumber('');
    };
    useEffect(() => {
        const name = sessionStorage.getItem('name');
        const phone = sessionStorage.getItem('phone');
        setName(name)
        setPhoneNumber(phone)
    }, []);
    return (
            <form onSubmit={handleFormSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="datetime">Date of Appointment:</label>
                    <input
                        type="date"
                        id="datetime"
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="selectedSlot">Book Time Slot:</label>
                    <select name="selectedSlot" id="selectedSlot" required value={timeSlot} onChange={handleSlotSelection}>
                        <option label="Select a time slot" value="null"/>
                        <option label="9:00 AM" value="9:00 AM"/>
                        <option label="10:00 AM" value="10:00 AM"/>
                    </select>
                </div>
                <button type="submit">Book Now</button>
            </form>
    )
}

export default AppointmentForm;
