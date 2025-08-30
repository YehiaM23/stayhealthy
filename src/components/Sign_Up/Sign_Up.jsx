import { useState } from "react";
import { Link, useNavigate } from "react-router";
import './Sign_Up.css'
import { API_URL } from "@/config.js";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            navigate("/");
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (<div className="container" style={{marginTop: '5%'}}>
        <div className="signup-grid">
            <div className="signup-text">
                <h2>Sign Up</h2>
            </div>
            <div className="signup-text1" style={{textAlign: 'left'}}>
                <span>Already a member?</span>
                <Link to={'/login'} style={{color: "#2190FF"}}> Login</Link>
            </div>
            <div className="signup-form">
                <form method={'POST'} onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" required className="form-control" aria-describedby="helpId">
                            <option label="Select role" value=""/>
                            <option label="Doctor" value="Doctor"/>
                            <option label="Patient" value="Patient"/>
                            <option label="Admin" value="Admin"/>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required className="form-control"
                               placeholder="Enter your name"
                               aria-describedby="helpId" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                               className="form-control"
                               placeholder="Enter your phone number"
                               aria-describedby="helpId" value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" pattern=".+@\w+\.\w{2,3}" size="30" required
                               className="form-control"
                               placeholder="Enter your email" aria-describedby="helpId" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required className="form-control"
                               placeholder="Enter your password"
                               aria-describedby="helpId" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <div className="input-eyes">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.666664 8.00002C0.666664 8.00002 3.33333 2.66669 8 2.66669C12.6667 2.66669 15.3333 8.00002 15.3333 8.00002C15.3333 8.00002 12.6667 13.3334 8 13.3334C3.33333 13.3334 0.666664 8.00002 0.666664 8.00002Z"
                                    stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M8 10C9.10457 10 10 9.10459 10 8.00002C10 6.89545 9.10457 6.00002 8 6.00002C6.89543 6.00002 6 6.89545 6 8.00002C6 9.10459 6.89543 10 8 10Z"
                                    stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button type="submit"
                                className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit
                        </button>
                    </div>
                    <div className="btn-group">
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default SignUp;
