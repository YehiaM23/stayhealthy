import './Login.css'
import { Link } from "react-router";

function Login() {
    return (<div className="container">
        <div className="login-grid">
            <div className="login-text">
                <h2>Login</h2>
            </div>
            <div className="login-text">
                <span>Are you a new member? </span>
                <Link to={'/signup'} style={{color: "#2190FF"}}> Sign Up Here</Link>
            </div>
            <br/>
            <div className="login-form">
                <form action={''} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" pattern=".+@\w+\.\w{2,3}" size="30" required  className="form-control"
                               placeholder="Enter your email" aria-describedby="helpId"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            aria-describedby="helpId"
                        />
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
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login
                        </button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                    <br/>
                    <div className="login-text">
                        Forgot Password?
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default Login;
