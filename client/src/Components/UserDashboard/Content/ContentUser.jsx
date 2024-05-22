  import React,{useState,useEffect, useContext} from 'react'
import './contentuser.css'
import SearchBar2User from './SearchBar2User'
import DropUser from './DropUser'
import { BsFillFilterSquareFill } from "react-icons/bs";
import AssetsUser from './Assets/AssetsUser';
import Footer from '../../Public routes/Footer/Footer'
import OutsideClickHandler from 'react-outside-click-handler'
import { AuthContext } from '../../AuthProvider';
import ProfileUserButton from './ProfileUser';
import MessageUser from './Assets/MessageUser';
import MyAssetsUser from './Assets/MyAssetsUser';


function ContentUser({ isOpen,setIsOpen,activeUser,fetchRequests}) {
   const{assets,users,messages,fetchMessages} =useContext(AuthContext)
   const [searchQuery, setSearchQuery] = useState('');

   const MyAssets = assets.filter(asset => Number(asset.id) === activeUser.assetId);


   const filteredAssets = assets.filter(item => {
    const searchQueryLowerCase = searchQuery.toString().toLowerCase();
    return (
      
      item.name.toLowerCase().includes(searchQueryLowerCase) ||
      item.condition.toLowerCase().includes(searchQueryLowerCase)
    );
  });
   const filteredUsers = users.filter(items => {
    const searchQueryLowerCase = searchQuery.toString().toLowerCase();
    return (
      
     
      items.role.toLowerCase().includes(searchQueryLowerCase)
    );
  });
  
    const assetUserComponent= filteredAssets.map((item,i)=>(
        <AssetsUser
        name={item.name}
        image={item.image}
        condition={item.condition}
        number={item.number}
        dispursed={item.dispursed}
        id={item.id}
        key={i}
        />
    ))
    const employeeUserComponent= MyAssets.map((item,i)=>(
        <MyAssetsUser
        name={item.name}
        image={item.image}
        condition={item.condition}
        key={i}
        />
    ))
   const profileUserButton = (
    <ProfileUserButton
    name={activeUser.userName}
    email={activeUser.email}
    role ={activeUser.role}
    />
   )
   const messageUserComponent = messages.map ((item,i)=>(
    <MessageUser
    msg={item.message}
    />
   ))

const [display,setDisplay]=useState('assets');



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
  
</OutsideClickHandler>

            {
                isOpen?<div className="flexColCenter content-right rit" >
                <button className="buttonn">{activeUser.role}</button>
                <div className="circle"><img src={activeUser.image} alt="" /></div>
                <span className='span'>{activeUser.userName}</span>
                <span className='span2'>Refresh profile</span>
                <div> {profileUserButton}</div>
                <button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('assets'); }} >Assets</button>
<button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('employees'); }}>My Assets</button>

<button className="button-black" onClick={(event) => { event.stopPropagation(); setDisplay('message');fetchMessages() }}>Message</button>
               
            </div> : null
            }
            
            
            <div className="flexColCenter content-left">
                <div className="top">
                    {
                        display === 'assets' &&(
                            <>
                            <span className="blueText title">
                        Assets({filteredAssets.length})</span>
                            </>
                        )
                    }
                    {
                        display === 'employees' &&(
                            <>
                            <span className="blueText title">
                        My asssets({MyAssets.length})</span>
                            </>
                        )
                    }
                     {
                        display === 'message' &&(
                            <>
                            <span className="blueText title">
                        Messages({messages.length})</span>
                            </>
                        )
                    }
                     <br />
                    <div className="flexCenter search">
                        <div className="left">  <SearchBar2User
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                        /></div>
                        <div className="right-side"><span>sort By</span>
                        <span/>
                        <DropUser/>
                        <button className='button-filter'><BsFillFilterSquareFill /></button></div>
                      
                        
                    </div>
                    
                </div>
                
                <div className="flexCenter innerWidth bottom">
                    {
                        display === 'assets' && (
                            <div className="flexCenter asset-display">
                                {assetUserComponent}
                            </div>
                        )
                    }
                    {
                        display === 'employees' && (
                            <div className="flexCenter innerWidth asset-display">
                               {employeeUserComponent}
                            </div>
                        )
                    }
                    {
                        display === 'message' && (
                            messages.length > 0 ?(<div className="innerWidth flexCenter asset-display">
                               {messageUserComponent}
                            </div>):( <div className="empty">
                              <div className="message-empty"><p className='orangeText' >No messages at the moment.</p></div>
                              <div className="img-empty"><img src="./public/empty.svg" alt="" /></div>
                            </div>)
                            
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

export default ContentUser