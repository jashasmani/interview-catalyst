import axios from 'axios';
import React, { useState } from 'react';
// import ReactDOM from 'react-dom'

const CustomModal = ({ closeModal }) => {

    const [questions, setQuestions] = useState({
        question: '',
        answer: ''
    });


    const getquestion = (e) => {

        const { name, value } = e.target;
        setQuestions((prevData) => ({
            ...prevData,
            [name]: value

        }))
    }

    console.log(questions)



    const callCloseModal = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/question', questions)

            console.log(response.data);


        }
        catch (error) {
            console.log(error)
        }

        setQuestions({
            question: '',
            answer: ''
        })

        closeModal();
    }

    return( 
    // ReactDOM.createPortal(
        <>
            <div className="modal-wrapper" onClick={closeModal}> </div>

            <div className="modal-container">
                <div className='title-write'>
                    <label >Create Post</label>
                </div>
                <div className='inputfield'>
                    <textarea
                        type="text"
                        rows="3"
                        name='question'
                        value={questions.question}
                        onChange={getquestion}
                        placeholder="What's on your mind?"
                        className='question-write'
                        required />
                    <textarea
                        type="text"
                        rows="9"
                        name='answer'
                        value={questions.answer}
                        onChange={getquestion}
                        placeholder="Compose your answer here..."
                        className='answer-write' />
                </div>
                <div className='two-buttons'>

                    <button onClick={closeModal} className="btn-write-in-cancel">
                        Cancel
                    </button>

                    <button onClick={callCloseModal} className="btn-write-in">
                        Send
                    </button>
                </div>
            </div>

        </>
        // ,document.querySelector(".selfParentNode")
    );
};

export default CustomModal;
