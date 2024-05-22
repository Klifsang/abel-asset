import React,{useState} from 'react'
import SearchBar from './SearchUser'
import { BellOutlined,BgColorsOutlined } from '@ant-design/icons'
import { CgProfile } from "react-icons/cg";
import { MenuUnfoldOutlined } from '@ant-design/icons';


import 'materialize-css/dist/css/materialize.min.css';
import './navuser.css'
import AddUserButton from './AddUserButtonUser';
import AddUserButtonUser from './AddUserButtonUser';

function NavUser({setIsOpen,messages}) {
  
  return (
    <section className="nav-admin">
        <nav>
    <div class="nav-wrapper white">
   
      <a href="#!" class="brand-logo"><i class="material-icons"><span className='menu' onClick={()=>setIsOpen((prev)=>!prev)}> <MenuUnfoldOutlined /></span></i><img src="./logo.svg" alt="" /> <span className='asset-ace'>Asset-Ace</span>  </a>
      
      <ul class="right hide-on-med-and-down">
        <li><SearchBar/></li>
        
        <li><a href=""><BgColorsOutlined style={{
            fontSize:'22px'
        }}/></a></li>
        <li><a href=""><i class="material-icons"><BellOutlined />{messages.length}</i></a></li>
      
      </ul>

      <div className='flexCenter'><AddUserButtonUser /></div>
    </div>
  </nav>
    </section>
  )
}

export default NavUser