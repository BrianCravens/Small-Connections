import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap'
import MemberCard from './MemberCard';
import MyMembersCard from './MyMembersCard';
import dataManager from '../../modules/dataManager'
import './Member.css'

const MemberList = props => {
    
    const [members, setMembers] = useState([]);
    const [myMembers, setMyMembers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [admin, setAdmin] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user"))


    const getMembers = () =>{
        return dataManager.getAll('members')
            .then((members)=> {
                setMembers(members);
                
            })
            .catch((err) => console.error('There was an issue with getting all members:', err))
        
    }
    const getAdmin = () => {
        return dataManager.get('members', currentUser)
        .then((admin) => {
            setAdmin(admin.is_admin)
        })
    }
    const getMyGroup = () =>{
        return dataManager.getAll('membergroups/mygroup')
            .then((members)=> {
                setMyMembers(members)
            })
            
            .catch((err) => console.error('There was an issue with getting all members:', err))
        
    }
    
    useEffect(() =>{
        getMembers();
    }, [])
    useEffect(()=>{
        getAdmin();
    }, [])
    
    useEffect(() =>{
        getMyGroup();
    }, [])

    return (
        <div className= 'MembersList'>
            
            <h1>Members</h1>
            {admin?
            <Button onClick={()=> {setToggle(!toggle)}}>View All Members</Button>
            :null}
            {toggle?
            <div className= 'member-card-container'>
            {members.map((member)=> (<MemberCard key={member.id} member={member}/>))}
            </div>
            :
            <div className= 'member-card-container'>
            {myMembers.map((member)=> (<MyMembersCard key={member.member.id} member = {member}/>))}
            </div>
            }

        </div>
    )
}
export default MemberList