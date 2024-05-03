import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Forgot.css'
import img from './forgot (2).png'
function Forgot_pass() {
    const [mail, setMail] = useState("");
    const [responseMsg, setResponseMsg] = useState("");




    const onPasswordChange = (e) => {
        setMail(e.target.value);
    }

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("starting point in JSX")
            const res = await axios.post('http://localhost:5000/user/forgot-password', { mail })
            console.log("JSX  2")
            console.log(res.data.message)
            setResponseMsg(res.data.message)
            console.log("JSX  3")

        }
        catch (error) {
            setResponseMsg("Provide valid email address")
            console.log(error);
        }

        setMail("");
    }

    return (
        <section className='main-forgot'>
            <form onSubmit={onPasswordSubmit}>
                <div className="container-forgot">
                    <div className="header-forgot">
                        <img src={img} alt="" />
                        <div className="text-forgot">Forgot Password?</div>
                        <div className="msg-forgot" >
                            <label className="msg-forgot-center">Enter your email & we'll send you a link to reset your password.</label>
                            {/* <label className="msg-forgot-center"></label> */}

                        </div>
                    </div>


                    <div className="inputs-forgot">
                        <label className='subtitle-response-forgot'> {responseMsg}  </label>

                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input
                            className='input-forgot'
                                type='email'
                                name='email'
                                placeholder='Enter Email'
                                value={mail}
                                onChange={onPasswordChange}
                                required
                            />
                        </div>

                        <div className="submit-forgot">
                            <button className="button-send">Send</button>
                            <div className='back'>
                                <Link to='/signin' className='back-back'>
                                    Back to Sign In</Link>
                            </div>
                        </div>
                    </div>



                </div>
            </form>
        </section>
    )
}

export default Forgot_pass;