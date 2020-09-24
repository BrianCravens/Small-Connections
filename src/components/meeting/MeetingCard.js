import React from 'react'
import { Link } from "react-router-dom";
import './Meeting.css'

const MeetingCard = props => {

    const detailsLink = `/meetings/${props.meeting.id}`
    
    return(
        <div className='meeting-card'>
            <div className='meeting-card-content'>
                <img src={props.meeting.image} alt={props.meeting.id} />
                <Link className='meeting-link' to = {detailsLink}>
                <div className='meeting-title'>{props.meeting.title}</div>
                <div className='meeting-date'>{props.meeting.date}</div>
                </Link>
            </div>
        </div>
    )
}

export default MeetingCard