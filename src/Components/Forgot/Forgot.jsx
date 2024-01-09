import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Forgot_pass() {
    const [mail, setMail] = useState("");
    // const [msg, setMsg] = useState("");

    const navigate=useNavigate();

    const onPasswordChange = (e) => {
        setMail(e.target.value);
    }

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/mail',  { email: mail })
            // .then(response => setMsg(response.data.respMesg));
            console.log(response.data.message)
        }
        catch (error) {
            console.log(error);
        }


        setMail("");
    }

    return (
        <form onSubmit={onPasswordSubmit}>
            <div className="container">
                <div className="header">
                    <div className="text">Forgot Password</div>
                    <div className="underline"></div>
                    {/* <h3>{msg}</h3> */}
                    {/* <div className="underline"></div> */}


                    <div className="newtons-cradle">
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                        </div>
                </div>


                <div className="inputs">


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

                    <div className="submit next">
                        <button onClick={() => navigate('')}>Send</button>
                    </div>
                </div>



            </div>
        </form>
    )
}

export default Forgot_pass