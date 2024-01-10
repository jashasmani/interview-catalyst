import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';
import img from './img.jpg'

function Login() {

    // const navigate = useNavigate();

    const [home, setHome] = useState("Login");
    // const [rederror, setRedError] = useState("");

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
        username: '',
        email: '',
        password: '',
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


        try {
            const response = await axios.post('http://localhost:8000/register', registrationData);
            console.log(response.data);
        }
        catch (error) {
            console.log(error)
        }

        setRegistrationData({
            username: '',
            email: '',
            password: '',
        })


    }


    // ******************************-----------------------------------********************************--------------------------**********************
    // const { email, password, confirm_password } = registrationData;
    // const showError = () => {
    //     if ("" === email) {
    //         setRedError("Please Enter Email");
    //         return;
    //     }
    //     else if (password === "") {
    //         setRedError("Please enter a password");
    //         return;
    //     }
    //     else if (password.lenght < 7) {
    //         setRedError("The password must be 8 characters or longer");
    //         return;
    //     }
    //     else if (confirm_password.lenght < 7) {
    //         setRedError("The password must be 8 characters or longer");
    //         return;
    //     }
    // }



    return (
        <>
            <form onSubmit={home === "Login" ? handleLoginSubmit : handleRegistrationSubmit} autoComplete="off" >
                <div className='main_login'>
                    <div className="container1">

                        <img src={img} alt="img"  />

                    </div>
                    <div className="container2">

                        <div className="header">
                            <div className="text">
                                {home} to your Account
                            </div>
                            {/* <div className="underline"></div> */}
                            {home === "Login" ? <label className='subtitle'>Welcome back, {home} your account </label> :
                                <label className='subtitle'>{home} your account </label>}
                        </div>

                        <div className="inputs">

                            {home === "Login" ? <div></div> :

                                <div className="input">
                                    <i class="fa-solid fa-user"></i>
                                    <input
                                        type='text'
                                        name='username'
                                        placeholder='Username'
                                        value={registrationData.username}
                                        onChange={handleRegistrationChange}
                                        required
                                        
                                    />

                                </div>
                            }
                            {/* <label className='error'>{rederror}</label> */}

                            <div className="input">
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={home === "Login" ? loginData.email : registrationData.email}
                                    onChange={home === "Login" ? handleLoginChange : handleRegistrationChange}
                                    required
                                    
                                />
                            </div>
                            {/* <label className='error'>{rederror}</label> */}

                            <div className="input">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={home === "Login" ? loginData.password : registrationData.password}
                                    onChange={home === "Login" ? handleLoginChange : handleRegistrationChange}
                                    required
                                    
                                />
                            </div>
                            {/* <label className='error'>{rederror}</label> */}


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

                                <button
                                    // onClick={showError}
                                    className={home === "Login" ? "white" : "blue"}>
                                    Login
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </>
    )
}


export default Login;