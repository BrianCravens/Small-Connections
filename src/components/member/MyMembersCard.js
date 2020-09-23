import React from 'react'
import { Link } from "react-router-dom";
import './Member.css'

const MyMembersCard = props => {

    const detailsLink = `/members/${props.member.member.id}`
    
    return(
        <div className='member-card'>
            <div className='member-card-content'>
                <img src={props.member.member.image} alt={props.member.member.id} />
                <Link className='member-name' to = {detailsLink}>
                <p>{props.member.member.user.first_name} {props.member.member.user.last_name}</p>
                </Link>
            </div>
        </div>
    )
}

export default MyMembersCard