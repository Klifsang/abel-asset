// ProfileButton.js
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Profile = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}  className=' button-black' style={{
        width:'280px',
        justifyContent:'center',
        alignItems:"center",
        color:'black',
        display:'flex',
        padding: '0.8rem 1.8rem'
      }} >
        View Profile
      </Button>
      <Modal
        title="User Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Display user details here */}
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
        {/* Add more user details as needed */}
      </Modal>
    </div>
  );
};

export default Profile;
