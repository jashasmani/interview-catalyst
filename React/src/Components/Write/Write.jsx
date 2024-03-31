// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import CustomModal from './Input';
// import './Write.css';
// import { Link } from 'react-router-dom';

// const Write = () => {
//   const [model, setmodel] = useState(false);

//   const changeModal = () => setmodel(false);


//   useEffect(() => {
//     document.body.style.overflowY = "hidden";

//     return () => {
//       document.body.style.overflowY = "scroll";
//     }
//   }, [])



//   return (
//     <>
//       <Link
//         className="btn-write"
//         onClick={() => setmodel(true)}>
//         Open
//       </Link>
//       {model && <CustomModal closeModal={changeModal} />}

//     </>
//   );
// };

// export default Write;
