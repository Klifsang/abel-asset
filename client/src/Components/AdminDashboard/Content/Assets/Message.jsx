import React, { useContext, useState ,useEffect} from 'react';
import { Card } from 'antd';
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider';

const Message = (props) => {
const{fetchRequests,requests} =useContext(AuthContext)
useEffect(() => {
  // This effect will run whenever the `messages` state changes
  console.log('Messages updated:', requests);
  fetchRequests
  // You can call fetchMessages here if you need to fetch the latest messages from the backend
  // fetchMessages();
}, [requests]);

  const handleAction = (actionType, itemId ) => {
    switch (actionType) {
      case 'accept':
        props.onAccept(itemId);
        fetchRequests() // Call the accept handler from Content
        break;
      case 'pending':
        props.onPending(itemId);
        fetchRequests()
        break;
      case 'decline':
        props.onDecline(itemId)
        fetchRequests()
        break;
      default:
        console.error(`Unsupported action type: ${actionType}`);
    }
  };

  return (
    <section className="messa" style={{
      border: '0.2px solid grey',
      backgroundColor: 'blue',
      borderRadius: '10px'
    }}>
      <Card
        title={props.user}
        bordered={false}
        key={props.id}
        style={{
          width: 300,
          height: 300,
          background: 'aliceblue'
        }}
      >
        <p>Employees email: {props.username}</p>
        <p>Item description: {props.description}</p>
        <p>Priority: {props.priority}</p>
        <p>Date needed: {props.dateRequired}</p>
        <p>Reason: {props.reason}</p>
        <p>Employee department: {props.department}</p>
        <p>Previously owned: {props.previouslyOwned}</p>
        <p>Item quantity: {props.Quantity}</p>

        <div className="buttons">
        <button className="buttonn" onClick={() =>{handleAction('accept', props.id);fetchRequests()} }>Accept</button>
        <button className="buttonn" onClick={() => handleAction('pending', props.id)}>Pending</button>
        <button className="buttonn" onClick={() => handleAction('decline', props.id)}>Decline</button>
      </div>
      </Card>
    </section>
  );
};

export default Message;
