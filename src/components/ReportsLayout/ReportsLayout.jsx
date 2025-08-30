import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function ReportsLayout() {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const userName = sessionStorage.getItem("name")
        const data = JSON.parse(localStorage.getItem("doctorData"));
        const appointments = data?.filter((item) => item.name === userName) || [];
        setAppointments(appointments)
    }, []);

    return (
        <div className="reviews">
            <h1 className="title">Reports</h1>
            <table cellSpacing={0}>
                <colgroup>
                    <col width='100'/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                </colgroup>
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Doctor Name</th>
                    <th>Doctor Speciality</th>
                    <th>View Report</th>
                    <th>Download Report</th>
                </tr>
                </thead>
                <tbody>
                {
                    appointments.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.doctorName}</td>
                                <td>{item?.doctorSpeciality}</td>
                                <td>
                                    <Link to={'/Appointment Booking.pdf'} target="_blank" rel="noopener noreferrer" >
                                        <button type="button">View Report</button>
                                    </Link>
                                </td>
                                <td>
                                    <button type="button">Download Report</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default ReportsLayout;
