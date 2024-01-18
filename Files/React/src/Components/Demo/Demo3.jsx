// src/components/Buy.js

import React, { useState } from 'react';
import axios from 'axios';

const Buy = ({ token }) => {
  const [itemName, setItemName] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState('');

  const handleBuy = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/buy',
        { itemName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPurchaseStatus(response.data);
    } catch (error) {
      setPurchaseStatus('Error: ' + error.response.data);
    }
  };

  return (
    <div>
      <h2>Buy</h2>
      <div>
        <label>Item Name:</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </div>
      <button onClick={handleBuy}>Buy</button>
      {purchaseStatus && <p>{purchaseStatus}</p>}
    </div>
  );
};

export default Buy;
