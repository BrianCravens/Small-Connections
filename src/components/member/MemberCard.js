import React from 'react'
import { Link } from "react-router-dom";
import './Member.css'

const MemberCard = props => {

    const detailsLink = `/members/${props.member.id}`
    
    return(
        <div className='member-card'>
            <div className='member-card-content'>
                <img src={props.member.image} alt={props.member.id} />
                <Link className='member-name' to = {detailsLink}>
                <div className='member-name'>{props.member.user.first_name} {props.member.user.last_name}</div>
                </Link>
            </div>
        </div>
    )
}

export default MemberCard