import React,{useState,useContext, useEffect} from 'react'
import './content.css'
import SearchBar2 from './SearchBar2'
import Drop from './Drop'
import { BsFillFilterSquareFill } from "react-icons/bs";
import Assets from './Assets/Assets';
import Footer from '../../Public routes/Footer/Footer'
import OutsideClickHandler from 'react-outside-click-handler'
import Employees from './Assets/Employees';
import { AuthContext } from '../../AuthProvider';
import Profile from './Profile';
import Message from './Assets/Message';
import axios from 'axios';
import { message } from 'antd';
import HttpClient from '../../../HttpClient';



function Content({ isOpen,setIsOpen }) {


const [display,setDisplay]=useState('assets');
const {activeUser, assets,users,requests,setRequests,fetchRequests} = useContext(AuthContext);
const [searchQuery, setSearchQuery] = useState('');

// Inside Content component
const handleAccept = async (itemId) => {
  try {
    // Send approval message
    const response = await HttpClient.post('/api/approved', {
      userId: itemId,
      messageId: itemId,
      message: 'Your request has been APPROVED, please wait for disbursement'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to send approval message');
    }

    console.log('Message sent successfully');
    alert('Message sent successfully');

    // Delete the request
    const deleteResponse = await axios.delete(`/api/requests/${itemId}`);
    
    if (deleteResponse.status !== 200) {
      throw new Error('Failed to delete request');
    }

    // Refresh the requests list
    fetchRequests();

  } catch (error) {
    console.error('Request acceptance and deletion failed:', error);
    // Handle error, e.g., show a notification to the user
  }
};

  const handlePending = async (itemId) => {
    try {
      // Validate form fields
      const response = await HttpClient.post('/api/approved', {
        userId: itemId,
        messageId: itemId,
        message: 'Your request has been placed on PENDING, please wait for any incoming messages via email'
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to request asset');
      }
  
      console.log('Message sent successfully');
      alert('Message sent successfully');
  
      const deleteResponse = await axios.delete(`/api/requests/${itemId}`);
      
      if (deleteResponse.status !== 200) {
        throw new Error('Failed to delete request');
      }
  
      // Refresh the requests list
      fetchRequests();
  
    } catch (error) {
      console.error('Request acceptance and deletion failed:', error);
      // Handle error, e.g., show a notification to the user
    }
  };
  
  const handleDecline = async (itemId) => {
    try {
      // Send decline message
      const response = await HttpClient.post('/api/approved', {
        userId: itemId,
        messageId: itemId,
        message: 'Your request has been DECLINED, please forward any concerns to management via the home page contacts'
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to send decline message');
      }
  
      console.log('Message sent successfully');
      alert('Message sent successfully');
  
      // Delete the request
      const deleteResponse = await axios.delete(`/api/requests/${itemId}`);
      
      if (deleteResponse.status !== 200) {
        throw new Error('Failed to delete request');
      }
  
      // Refresh the requests list
      fetchRequests();
  
    } catch (error) {
      console.error('Request decline and deletion failed:', error);
      // Handle error, e.g., show a notification to the user
    }
  };
  
  
  

const filteredAssets = assets.filter(item => {
    const searchQueryLowerCase = searchQuery.toString().toLowerCase();
    if(item){return (
      
      item.name.toLowerCase().includes(searchQueryLowerCase) ||
      item.condition.toLowerCase().includes(searchQueryLowerCase)
    );}
    
  });


   const filteredUsers = users.filter(items => {
    const searchQueryLowerCase = searchQuery.toString().toLowerCase();
    return (
      
     
      items.role.toLowerCase().includes(searchQueryLowerCase)
    );
  });
  
   const filteredRequests = requests.filter(items => {
    if (requests.length>0){ 
        const searchQueryLowerCase = searchQuery.toString().toLowerCase();
    
        return (
      items.id.toLowerCase().includes(searchQueryLowerCase)
    );}
   
    
  });
  
    const assetComponent= filteredAssets.map((item,i)=>(
        <Assets
        name={item.name}
        image={item.image}
        condition={item.condition}
        number={item.number}
        dispursed={item.dispursed}
        key={i}
        />
    ))
    const employeeComponent= filteredUsers.map((item,i)=>(
        <Employees
        username={item.username}
        image={item.image}
        role={item.role}
        key={i}
        />
    ))
    const messageComponent= filteredRequests.map((item,i)=>(
        <Message
        username={item.username}
        description={item.description}
        priority={item.priority}
        department={item.department}
        previouslyOwned={item.previouslyOwned}
        dateRequired={item.dateRequired}
        reason={item.reason}
        quantity={item.quantity}
        id={item.id}
        key={i}
        onAccept={handleAccept}
        onPending={handlePending}
        onDecline={handleDecline}
       
        />
    ))
    
    const buttonComponent = (
        <Profile
        name={activeUser.userName}
        email={activeUser.email}
        role ={activeUser.role}
        />
       )


  return (
    <section className="content">
       

        <div className="flexCenter innerWidth paddings content-wrapper"> <OutsideClickHandler
  onOutsideClick={(event) => {
    if(document.documentElement.clientWidth > 640){
        setIsOpen(true)
    }
    else{
        if (!['button-black'].includes(event.target.className)) {
        setIsOpen(false);
      }
    }
    
    
  }}
>
  {/* Your content here */}
</OutsideClickHandler>
            {
                isOpen?<div className="flexColCenter content-right rit" >
                <button className="buttonn">{activeUser.role}</button>
                <div className="circle"><img src={activeUser.image} alt="profile" /></div>
                <span className='span'>Admin</span>
                <span className='span2'>Refresh profile</span>
                <div>{buttonComponent}</div>
                <button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('assets'); }} >Assets</button>
                <button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('employees'); }}>Employees</button>

                <button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('message');fetchRequests() }}>Message</button>
            </div> : null
            }
            
            
            <div className="flexColCenter content-left">
                <div className="top">
                    {
                        display === 'assets' &&(
                            <>
                            <span className="blueText title">
                        Assets({assets.length})</span>
                            </>
                        )
                    }
                    {
                        display === 'employees' &&(
                            <>
                            <span className="blueText title">
                        Employees({users.length})</span>
                            </>
                        )
                    }
                    {
                        display === 'message' &&(
                            <>
                            <span className="blueText title">
                        Messages({requests.length})</span>
                            </>
                        )
                    }
                     <br />
                    <div className="flexCenter search">
                        <div className="left">  <SearchBar2
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                        /></div>
                        <div className="right-side"><span>sort By</span>
                        <span/>
                        <Drop/>
                        <button className='button-filter'><BsFillFilterSquareFill /></button></div>
                      
                        
                    </div>
                    
                </div>
                <div className="flexCenter innerWidth bottom">
                    {
                        display === 'assets' && (
                            <div className="innerWidth flexCenter asset-display">
                                {assetComponent}
                            </div>
                        )
                    }
                    {
                        display === 'employees' && (
                            <div className="innerWidth flexCenter asset-display">
                               {employeeComponent}
                            </div>
                        )
                    }
                    {
                        display === 'message' && (
                            requests.length > 0 ?(<div className="innerWidth flexCenter asset-display">
                               {messageComponent}
                            </div>):( <div className="empty">
                              <div className="message-empty"><p className='orangeText' >No requests available.</p></div>
                              <div className="img-empty"><img src="./public/empty.svg" alt="" /></div>
                            </div> )
                            
                        )
                    }
                </div>
            </div>
            <div className="content-footer">
            <Footer/>
        </div>
        </div>
       
    </section>
  )
}

export default Content