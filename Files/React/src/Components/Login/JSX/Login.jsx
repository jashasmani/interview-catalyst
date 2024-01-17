import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';
import img from './img.jpg'

function Login() {



    const [home, setHome] = useState("Login");
    const [response, setResponse] = useState("");


    // -------------------************************---------------------********************-------------------*****************-----------------************

    const clearData=()=>{
        setResponse("");
    }

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

        setResponse("");

        try {

            const res = await axios.post('http://localhost:8000/user/login', loginData);
            console.log(res.data.message)
            setResponse(res.data.message);

        } catch (error) {

            setResponse('Login failed. \nPlease check your credentials.');
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

        setResponse("");

        try {
            const res = await axios.post('http://localhost:8000/user/register', registrationData);
            console.log(res.data.message);
            setResponse(res.data.message);

        } catch (error) {

            console.error('Sign Up error', error)
            setResponse('Sign Up failed. \n Please check your credentials.');

        }

        setRegistrationData({
            username: '',
            email: '',
            password: '',
        })


    }

    return (
        <>
            <form onSubmit={home === "Login" ? handleLoginSubmit : handleRegistrationSubmit} autoComplete="off" >
                <div className='main_login'>
                    <div className="container1">

                        <img src={img} alt="img" />

                    </div>
                    <div className="container2">

                        <div className="header">
                            <div className="text">
                                {home} to your Account
                            </div>
                            {home === "Login" ? <label className='subtitle'>Welcome back, {home} your account </label> :
                                <label className='subtitle'>{home} your account </label>}
                        </div>




                        <div className="inputs">

                        {home === "Login" ? <label className='subtitle-response'> {response}  </label> :
                            <label className='subtitle-response'>{response} </label>}


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

                                <button
                                    className={home === "Sign Up" ? "white" : "blue"}
                                    onClick={clearData}>
                                        Sign Up</button>

                            </div>


                            <div
                                className={home === "Sign Up" ? "submit next" : "submit"}
                                onClick={() => setHome("Login")}>



                                <button
                                    // onClick={showError}
                                    className={home === "Login" ? "white" : "blue"}
                                    onClick={clearData}>
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