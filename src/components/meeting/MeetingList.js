import React, { useState, useEffect } from 'react';
import MeetingCard from './MeetingCard';
import dataManager from '../../modules/dataManager'
import './Meeting.css'
import { Button } from 'react-bootstrap';

const MeetingList = props => {
    
    const [meetings, setMeetings] = useState([]);
    const [groups, setGroups] = useState([]);
    const [isLeader, setIsLeader] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user"));



    const getGroups = () =>{
        return dataManager.getAll('groups')
            .then((groups)=> {
                setGroups(groups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    const checkLeader = () => {
        setIsLeader(false)
        groups.map(group=>{
            if (parseInt(group.leader.id) === currentUser){
                setIsLeader(true)
            }
        })
    }

    const getMeetings = () =>{
        return dataManager.getAll('meetings')
            .then((meetings)=> {
                setMeetings(meetings);
            })
            .catch((err) => console.error('There was an issue with getting all meetings:', err))
        
    }
    useEffect(() =>{
        getMeetings();
    }, [])
    useEffect(() =>{
        getGroups();
    }, [])
    useEffect(() =>{
        checkLeader();
    }, [groups])

    return (
        <div className= 'MeetingsList'>
            <h1>Meetings</h1>
            <div className= 'meeting-card-container'>
            {meetings.map((meeting)=> (<MeetingCard key={meeting.id} meeting={meeting}/>))}
            </div>
            {isLeader?
            <Button onClick={()=>(props.history.push('/meeting'))}>Add Meeting</Button>
            :null}
        </div>
    )
}
export default MeetingList