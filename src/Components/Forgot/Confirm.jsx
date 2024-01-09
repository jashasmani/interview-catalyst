import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";



function Confirm() {

    const { id, token } = useParams();
    const navigate = useNavigate()
    const [checkpassword, setCheckPassword] = useState({
        password: '',
        confirm_password: '',
    })

    const onPasswordChange = (e) => {
        const { name, value } = e.target;

        setCheckPassword((prevData) => ({
            ...prevData,
            [name]: [value]
        }))
    }

   
    const onPasswordSubmit = (e) => {
        e.preventdefault();
        axios.post(`http://localhost:8000/confirm/${id}/${token}`, {checkpassword})
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login')

                }
            }).catch(err => console.log(err))

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
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={checkpassword.password}
                            onChange={onPasswordChange}
                            required
                        />
                    </div>

                    <div className="input">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type='password'
                            name='confirm_password'
                            placeholder='Confirm Password'
                            value={checkpassword.confirm_password}
                            onChange={onPasswordChange}
                            required
                        />
                    </div>

                    <div className="submit next">
                        {/* onClick={() => navigator('')} */}
                        <button>Change</button>
                    </div>


                </div>

            </div>
        </form>
    )
}

export default Confirm;