import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomModal from './Input';
import './Write.css';

const Write = () => {
  const [model, setmodel] = useState(false);

  const changeModal = () => setmodel(false);


  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, [])



  return (
    <>
      <button
        className="btn-write"
        onClick={() => setmodel(true)}>
        Open
      </button>
        {model && <CustomModal closeModal={changeModal} />}
      
    </>
  );
};

export default Write;
