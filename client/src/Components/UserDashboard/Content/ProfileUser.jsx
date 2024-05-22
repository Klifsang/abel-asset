// ProfileButton.js
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ProfileUserButton = (props) => {
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
    <div className='flexCenter' >
      <Button type="primary" onClick={showModal}  className=' button-black' style={{
        width:'283px',
        justifyContent:'center',
        alignItems:"center",
        color:'black',
        display:'flex'
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
        <p>Role: {props.role}</p>
        {/* Add more user details as needed */}
      </Modal>
    </div>
  );
};

export default ProfileUserButton;
