import React, { useState } from 'react';
import { Card, Modal } from 'antd';

const { Meta } = Card;

const Assets = (props) => {
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
    <section className="assets">
      <Card
        hoverable
        key={props.id}
        style={{
          width: 270,
          outline: '1px solid rgba(128, 128, 128, 0.404)',
          padding: '2px',
        }}
        cover={<img alt="example" src={props.image} style={{ maxHeight: '200px' }} />}
        onClick={showModal}
      >
        <Meta title={props.name} description="www.instagram.com" />
      </Card>

      <Modal title={props.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Details for <span className='orangeText'>{props.name}</span> </p>
        <p>{props.name} are {props.number} in total</p>
        <p>The Asset is in a <span className="orangeText">{props.condition}</span>  condition</p>
        <p>Dispursion of this asset is <span className="orangeText">{props.dispursed}</span> </p>
        <br />
        <button className='buttonn'>Delete asset</button>
        
      </Modal>
    </section>
  );
};

export default Assets;
