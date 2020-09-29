import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import useSimpleAuth from '../hooks/ui/useSimpleAuth'
import { FaAlignJustify } from 'react-icons/fa'

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const inGroup = props.inGroup

    
    
    return(
        <div className='all-nav-container'>
            <header className='header-container'>
            <div className='header-content'>
                 <div className='header-icon'>   
                <FaAlignJustify className= 'menu-icon' onClick={()=>props.setToggle(!props.toggle)}></FaAlignJustify>
                </div>
                <div className='header-title'>Small Connections</div>
                
                
                {isAuthenticated()?
                <div className='header-image'><img alt=""  src={props.member.image}/></div>
                :<div className='header-image'></div>}
                
            </div>
            </header>
            {props.toggle?
                <nav className="nav-overlay">
                    <ul className="nav-container">
                     {isAuthenticated() ?   
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/members" >Members</Link>
                    </li>:null}
                    {isAuthenticated() && inGroup ? 
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/membergroups">Requests</Link>
                    </li>:null}
                    {isAuthenticated()? 
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/groups">Groups</Link>
                    </li>:null}
                    {isAuthenticated() && inGroup ? 
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/messages">Messages</Link>
                    </li>:null}
                    {isAuthenticated() && inGroup ? 
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/prayers">Prayer Requests</Link>
                    </li>:null}
                    {isAuthenticated() && inGroup ? 
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/meetings">Meetings</Link>
                    </li>:null}
                    {isAuthenticated()? null:
                    <li>
                        <Link onClick={()=>props.setToggle(!props.toggle)} className='nav-link' to="/login">Login</Link>
                    </li>}
                    {isAuthenticated()? 
                    <li>
                    <span className="nav-link" onClick={() => {
                    logout()
                    props.setToggle(!props.toggle)
                    props.history.push('/login')
                    }}>Logout</span>
                    </li>:null}
                    </ul>
                </nav>
            :null}           
        </div>
    )
}

export default NavBar