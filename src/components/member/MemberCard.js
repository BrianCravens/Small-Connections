import React from 'react'
import { Link } from "react-router-dom";

const MemberCard = props => {

    const detailsLink = `/members/${props.member.id}`
    
    return(
        <Link to = {detailsLink}>
        <div className='member-card'>
            <div className='member-card-content'>
                <img src={props.member.image} height={200} width={240} alt={props.member.id} />
                <p>{props.member.user.first_name} {props.member.user.last_name}</p>
            </div>
        </div>
        </Link>
    )
}

export default MemberCard