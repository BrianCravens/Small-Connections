import React from 'react'
import { Link } from "react-router-dom";
import './Group.css'

const GroupCard = props => {

    const detailsLink = `/groups/${props.group.id}`
    
    return(
        <Link to = {detailsLink}>
        <div className='group-card'>
            <div className='group-card-content'>
                <div className='group-name'>{props.group.name}</div>
            </div>
        </div>
        </Link>
    )
}

export default GroupCard