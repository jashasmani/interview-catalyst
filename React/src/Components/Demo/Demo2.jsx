
import React from 'react';
import axios from 'axios';
import './demo.css';

const Home = () => {



  const handleBuy = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        "http://localhost:5000/api/buy",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("okay")
      console.log(response)
      alert("Mail Sent that on your purchase")
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        "http://localhost:5000/api/return",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("okay")
      console.log(response)
      alert("Mail Sent that on your return item")
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>

      <div>
      <h1 className='t1'>Home</h1>
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

        <div className='container-1'>
          <div className='c1'>
            <h4>Item 1</h4>
            <h6>Price : 50 $</h6>
            <h6>Do you want to return  product  </h6>
          </div>
          <div>
            <button className='b1' onClick={handleReturn}>
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

