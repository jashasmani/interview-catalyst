import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const [home, setHome] = useState("Login");
    // const [singup, setSingup] = useState("");
    // -------------------************************---------------------********************-------------------*****************-----------------************

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    //submit function
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', loginData);
            const { success, message } = response.data;

            if (success) {
                console.log('Login Successfully')
            }
            else {
                console.log(message);
            }
        }
        catch (error) {
            console.error('Login error', error)
        }
        setLoginData({
            email: '',
            password: ''
        })
    }



    // ******************************-----------------------------------********************************--------------------------**********************

    const [registrationData, setRegistrationData] = useState({
        email: '',
        password: '',
        confirm_password: ''
    })


    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;

        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

    }

    const handleRegistrationSubmit = async (e) => {

        e.preventDefault();

        // if (registrationData.password !== registrationData.confirm_password) {
        //     // Handle password mismatch error (e.g., show an error message)
        //     console.log('Password and Confirm Password do not match');
        //     return;
        // }

        try {
            const response = await axios.post('http://localhost:8000/register', registrationData);
            console.log(response.data);
        }
        catch (error) {
            console.log(error)
        }

        setRegistrationData({
            email: '',
            password: '',
            confirm_password: ''
        })

        // setSingup("Sign Up Successfully")
    }


    return (
        <>
            <form onSubmit={home === "Login" ? handleLoginSubmit : handleRegistrationSubmit} autoComplete="off" >
                <div className="container">
                    <div className="header">

                        <div className="text">
                            {home}
                        </div>
                        <div className="underline"></div>

                        {/* {home === "Sign Up" ? <div>{singup}</div> : <div></div>} */}

                        {/* <div className="newtons-cradle">
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                        </div> */}


                    </div>
                    <div className="inputs">


                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                type='text'
                                name='email'
                                placeholder='Email'
                                value={home === "Login" ? loginData.email : registrationData.email}
                                onChange={home === "Login" ? handleLoginChange : handleRegistrationChange}
                                required
                            />
                        </div>

                        <div className="input">
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={home === "Login" ? loginData.password : registrationData.password}
                                onChange={home === "Login" ? handleLoginChange : handleRegistrationChange}
                                required
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        {home === "Login" ? <div></div> :

                            <div className="input">
                                <input
                                    type='password'
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                    value={loginData.confirm_password}
                                    onChange={handleRegistrationChange}
                                    required
                                />
                                <i className="fa-solid fa-lock"></i>

                            </div>
                        }
                    </div>




                    {home === "Sign Up" ? <div></div> :

                        <div className="forgot-password">Forgot Password? <Link to="/forgot-password" className='link'>Click here</Link></div>
                    }


                    <div className="submit-container">
                        <div
                            className={home === "Login" ? "submit next" : "submit"}
                            onClick={() => setHome("Sign Up")}>

                            <button className={home === "Sign Up" ? "white" : "blue"}>Sign Up</button>

                        </div>


                        <div
                            className={home === "Sign Up" ? "submit next" : "submit"}
                            onClick={() => setHome("Login")}>

                            <button onClick={() => navigate('')} className={home === "Login" ? "white" : "blue"}>Login</button>
                        </div>
                    </div>

                </div>
            </form>

        </>
    )
}


export default Login;