import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBar = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      id='navy'
      onSearch={onSearch}
      style={{
        width: 420,
        
        borderRadius:'10px',
        
      }}
    />
   
    
    
    
  </Space>
);
export default SearchBar;