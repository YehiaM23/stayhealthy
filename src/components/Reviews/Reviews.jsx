import './Reviews.css'
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import ReviewForm from "components/ReviewForm/ReviewForm.jsx";

function Reviews() {
    const [doctorData, setDoctorData] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleReview = (data) => {
        const updateData = doctorData.map((item)=> item.id === data.id ? data : item)
        localStorage.setItem("doctorData", JSON.stringify(updateData));
        setAppointments(updateData)
        setShowModal(false)
        alert("Successfully reviewed!")
    }

    useEffect(() => {
        const userName = sessionStorage.getItem("name")
        const data = JSON.parse(localStorage.getItem("doctorData"));
        setDoctorData(data)
        const appointments = data?.filter((item) => item.name === userName) || [];
        setAppointments(appointments)
    }, []);

    return (
        <div className="reviews">
            <h1 className="title">Reviews</h1>
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
                    <th>S.No.</th>
                    <th>Doctor Name</th>
                    <th>Doctor Speciality</th>
                    <th>Provide Review</th>
                    <th>Review Given</th>
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
                                    <Popup
                                        className="review-form-popup"
                                        trigger={
                                            <button type="button" disabled={!!item?.rating}>Click Here</button>
                                        }
                                        modal
                                        open={showModal}
                                        onClose={() => setShowModal(false)}
                                    >
                                        {(close) => (
                                            <ReviewForm {...item} onSubmit={handleReview}/>
                                        )}
                                    </Popup>
                                </td>
                                <td>
                                    {
                                        item?.rating ? new Array(5).fill(null).map((curr, idx) => {
                                            return (
                                                <i className={`fa fa-star star ${idx < item.rating ? 'active' : ''}`}
                                                   key={idx}></i>
                                            )
                                        }) : ''
                                    }
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

export default Reviews;
