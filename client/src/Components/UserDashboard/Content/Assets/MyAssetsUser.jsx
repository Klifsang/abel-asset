import React, { useContext, useState } from 'react';
import { Card, Modal, Form, Input, Button } from 'antd';
import { AuthContext } from '../../../AuthProvider';

const { Meta } = Card;

const MyAssetsUser = (props) => {
  const{activeUser} = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showRequestModal = () => {
    setIsRequestModalVisible(true);
  };

  const handleRequestOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await fetch('api/requests', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({id:`${activeUser.id}`,name:`${props.name}`,username:`${activeUser.username}`,...values}), // Send form values to the server
      });
       console.log(activeUser)
      if (!response.ok) {
        throw new Error('Failed to request asset');
      }

      console.log('Asset requested successfully');
      console.log(activeUser)
      alert('Asset requested successfully');

      form.resetFields();
      setIsRequestModalVisible(false);
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Requesting asset failed:', error);
      alert('Requesting asset failed. Please retry after a few seconds.');
    }
  };

  const handleRequestCancel = () => {
    setIsRequestModalVisible(false);
  };

  return (
    <section className="assets">
      <Card
        hoverable
        key={props.id}
        style={{ width: 250, outline: '1px solid rgba(128, 128, 128, 0.404)', padding: '2px' }}
        cover={<img alt="example" src={props.image} />}
        onClick={showModal}
      >
        <Meta title={props.name} description={`last known condition: ${props.condition}`} />
      </Card>

      <Modal title={props.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Details for <span className='orangeText'>{props.name}</span> </p>
        <p>The Asset is in a <span className="orangeText">{props.condition}</span>  condition</p>
        <br />
        <Button type="primary" onClick={showRequestModal}>Request repair</Button>
      </Modal>

      <Modal title="Request Asset" visible={isRequestModalVisible} onOk={handleRequestOk} onCancel={handleRequestCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="priority" label="priority" rules={[{ required: true, message: 'Please input the urgency!' }]}>
            <Input placeholder="Enter urgency" />
          </Form.Item>
          <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Please input the department!' }]}>
            <Input placeholder="Enter department" />
          </Form.Item>
          <Form.Item name="reason" label="Reason for request" rules={[{ required: true, message: 'Please input the reason!' }]}>
            <Input placeholder="Enter reason for reapair" />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default MyAssetsUser;
