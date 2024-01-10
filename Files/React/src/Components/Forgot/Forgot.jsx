import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Forgot.css'
import img from './forgot (2).png'
function Forgot_pass() {
    const [mail, setMail] = useState("");
    // const [msg, setMsg] = useState("");



    const onPasswordChange = (e) => {
        setMail(e.target.value);
    }

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("hii")
            const response = await axios.post('http://localhost:8000/mail', { mail })
            // .then(response => setMsg(response.data.respMesg));
            console.log(response.data.respMesg)

        }
        catch (error) {
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
                        <label className="msg-forgot-center">Enter your email and we'll send you a link</label>
                        <label className="msg-forgot-center">to reset your password.</label>

                        </div>
                    </div>


                    <div className="inputs-forgot">


                        <div className="input">
                            <i className="fa-solid fa-envelope"></i>
                            <input
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
                                <Link to='/login'>
                                    {/* <i class="fa-solid fa-arrow-left "></i> */}
                                Back to Login</Link>
                            </div>
                        </div>
                    </div>



                </div>
            </form>
        </section>
    )
}

export default Forgot_pass;