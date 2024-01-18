
import React, { useState } from 'react';
import axios from 'axios';
import './demo.css';

const Home = () => {



  const handleBuy = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        "http://localhost:3001/api/buy",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("okay")
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Home</h1>
      <div>
        <div className='container-1'>
          <div className='c1'>
            <h4>Item 1</h4>
            <h6>Price : 50 $</h6>
            <h6>Quantity : 5 </h6>
          </div>
          <div>
            <button className='b1' onClick={handleBuy}>
              Buy
            </button>
          </div>
        </div>

        {/* <div className='container-1'>
          <div className='c1'>
            <h4>Item 1</h4>
            <h6>Price : 50 $</h6>
            <h6>Do you want to return  product  </h6>
          </div>
          <div>
            <button className='b1' onClick={handleBuy}>
              Return
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;

