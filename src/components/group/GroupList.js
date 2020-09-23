import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap'
import GroupCard from './GroupCard';
import dataManager from '../../modules/dataManager'

const GroupList = props => {
    const [groups, setGroups] = useState([]);
    const [memberGroups, setMemberGroups] = useState([{member:{}}])
    const [inGroup, setInGroup] = useState(false)
    const [leader, setLeader] = useState({});
    const [admin, setAdmin] = useState(false);
    const currentUser = parseInt(localStorage.getItem("user"))
    const [toggle, setToggle] = useState(false)
    
    const getGroups = () =>{
        return dataManager.getAll('groups')
            .then((groups)=> {
                setGroups(groups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    const getMemberGroups = () =>{
        return dataManager.getAll('membergroups/listall')
            .then((membergroups)=> {
                setMemberGroups(membergroups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    const isInGroup = () => {
        memberGroups.map(group=>{
            if (parseInt(group.member.id) === currentUser&&group.is_approved===true){
                setInGroup(true)
            }
        })
    }

    const isAdmin = () => {
        dataManager.get('members', currentUser)
        .then((member) => {
            if(member.is_admin === true){
                setAdmin(true)
            }else{
                setAdmin(false)
            }

        })
    }

    const isLeader = () => {
        setLeader(groups.find(group => group.leader.id === currentUser))
            
        



        }
    
    useEffect(() =>{
        if(leader != undefined){
            setToggle(false)
        }else if(admin === true){
            setToggle(true)
        }else{setToggle(false)}


    }, [admin, leader])
    useEffect(() =>{
        isAdmin();
    }, [])

    useEffect(() =>{
        getGroups();
    }, [])
    useEffect(() =>{
        getMemberGroups();
    }, [])
    useEffect(() =>{
        isInGroup();
    }, [memberGroups])

    useEffect(() => {
        isLeader();
    }, [groups])

    return (
        
            <div>

            {props.toggle? null:

            <div className= 'GroupsList'>
            <h1>Groups</h1>
            
            {toggle && !inGroup?<Button onClick={()=>(props.history.push("/group"))}>Add Group</Button>:null}
           
            {groups.map((group)=> (<GroupCard key={group.id} group={group}/>))}
            </div>
            }       
            </div>
    )
}
export default GroupList