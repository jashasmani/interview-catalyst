import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './Confirm.css'
import img_confirm from './confirmation (1).png'


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
            [name]: value
        }))
    }

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        // console.log(checkpassword);
        await axios.post(`http://localhost:5000/user/confirm/${id}/${token}`, checkpassword)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/signin');
                }
            })
            .catch(err => console.log(err));

        setCheckPassword({
            password: '',
            confirm_password: '',
        })
    }




    return (
        <section className='main-confirm'>
            <form onSubmit={onPasswordSubmit}>
                <div className="container-confirm">

                    <div className="header-confirm">
                        <img src={img_confirm} alt="" />
                        <div className="text-confirm">Confirm Password</div>

                    </div>


                    <div className="inputs-confirm">


                        <div className="input-confirm">
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

                        <div className="input-confirm">
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

                        <div className="submit-confirm">
                            <button
                                className="button-confirm">
                                Send
                            </button>
                        </div>


                    </div>

                </div>
            </form>
        </section>
    )
}

export default Confirm;