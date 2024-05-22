import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddUserButton = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await fetch('api/users', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values), // Send form values to the server
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      console.log('User added successfully');
      alert('User added successfully');
      form.resetFields(); // Clear form fields
      setVisible(false); // Close the modal
    } catch (error) {
      console.error('Adding user failed:', error);
      alert('Adding user failed. Please retry after a few seconds.');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleShowModal}>
        Add User
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // Hide the default footer
      >
        <Form form={form}>
          <Form.Item label="User Name" name="userName" rules={[{ required: true }]}>
            <Input placeholder="Enter user's name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter user's email" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter user's email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter user's password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true }]}>
            <Input.Password placeholder="Confirm user's password" />
          </Form.Item>
          {/* Add more form fields as needed */}
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserButton;
