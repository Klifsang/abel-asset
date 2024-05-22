import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { string } from 'yup';
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
const SearchBar2User = ({setSearchQuery,searchQuery}) => (
  <Space direction="vertical">
    <Search
      placeholder="search user"
      onSearch={onSearch}
      value={searchQuery}
      onChange={(e)=> setSearchQuery(e.target.value)}
      style={{
        width: 200,
      }}
    />
   
  </Space>
);
export default SearchBar2User;