import React from 'react'
import { Link } from "react-router-dom";
import './Member.css'

const MyMembersCard = props => {

    const detailsLink = `/members/${props.member.member.id}`
    
    return(
        <div className='member-card'>
            <Link className='member-link' to = {detailsLink}>
            <div className='member-card-content'>
                <img src={props.member.member.image} alt={props.member.member.id} />
                <div className='member-name'>{props.member.member.user.first_name} {props.member.member.user.last_name}</div>
            </div>
            </Link>
        </div>
    )
}

export default MyMembersCard