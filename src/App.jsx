import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import Navbar from 'components/Navbar/Navbar.jsx'
import LandingPage from "components/Landing_Page/LandingPage.jsx";
import Login from 'components/Login/Login.jsx'
import SignUp from "components/Sign_Up/Sign_Up.jsx";
import Reviews from "components/Reviews/Reviews.jsx";
import InstantConsultation from "components/InstantConsultationBooking/InstantConsultation.jsx";
import FindDoctorSearch from "components/FindDoctorSearch/FindDoctorSearch.jsx";
import AppointmentForm from "components/AppointmentForm/AppointmentForm.jsx"
import Notification from "components/Notification/Notification.jsx";
import ProfileCard from "components/ProfileCard/ProfileCard.jsx";
import ReportsLayout from "components/ReportsLayout/ReportsLayout.jsx";

function App() {

    return (
        <BrowserRouter>
            <Notification>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/appointments" element={<FindDoctorSearch/>}/>
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/instant-consultation" element={<InstantConsultation/>}/>
                    <Route path="/profile" element={<ProfileCard/>}/>
                    <Route path="/reports" element={<ReportsLayout/>}/>
                </Routes>
            </Notification>
        </BrowserRouter>
    )
}

export default App
