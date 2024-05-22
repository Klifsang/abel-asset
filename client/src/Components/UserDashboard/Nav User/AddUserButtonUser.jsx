import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { AuthContext } from '../../AuthProvider';

const AddUserButtonUser = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const{activeUser,fetchRequests} =useContext(AuthContext)

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await fetch('api/requests', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({id:`${activeUser.id}`,...values}), // Send form values to the server
      });
       console.log(activeUser)
      if (!response.ok) {
        throw new Error('Failed to request asset');
      }

      console.log('Asset requested successfully');
      console.log(activeUser)
      alert('Asset requested successfully');
      fetchRequests()
      form.resetFields(); // Clear form fields
      setVisible(false); // Close the modal
    } catch (error) {
      console.error('Requesting asset failed:', error);
      alert('Requesting asset failed. Please retry after a few seconds.');
    }
    
  };

  return (
    <div>
      <Button type="primary" onClick={handleShowModal}>
        Request Asset
      </Button>
      <Modal
        title="Request Asset"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // Hide the default footer
      >
        <Form form={form}>
          <Form.Item label="Asset Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter asset name" />
          </Form.Item>
          <Form.Item label="User Name" name="user" rules={[{ required: true }]}>
            <Input placeholder="Enter asset name" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input placeholder="Enter asset description" />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
            <Input type="number" min={1} placeholder="Enter quantity" />
          </Form.Item>
          <Form.Item label="Reason for Request" name="reason" rules={[{ required: true }]}>
            <Input placeholder="Enter reason for request" />
          </Form.Item>
          <Form.Item label="Priority Level" name="priority" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date Required" name="dateRequired" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Department" name="department" rules={[{ required: true }]}>
            <Input placeholder="Enter department" />
          </Form.Item>
          <Form.Item label="Manager Approval" name="managerApproval" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="no">No</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Previously Owned" name="previouslyOwned">
            <Select>
              <Select.Option value="no">No</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
            </Select>
          </Form.Item>
          {form.getFieldValue('previouslyOwned') === 'yes' && (
            <Form.Item label="What happened to the previous asset?" name="previousAssetDetails">
              <Input placeholder="Explain what happened" />
            </Form.Item>
          )}
          <Button type="primary" onClick={handleSubmit}>
            Request
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserButtonUser;


