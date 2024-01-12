import React from 'react';

const CustomModal = ({ closeModal }) => {
    return (
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
                        placeholder="What's on your mind?"
                        className='question-write'
                        required />
                    <textarea
                        type="text"
                        rows="9"
                        placeholder="Compose your answer here..."
                        className='answer-write' />
                </div>
                <button onClick={closeModal} className="btn-write-in">
                    Send
                </button>
            </div>

        </>
    );
};

export default CustomModal;
