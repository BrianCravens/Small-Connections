import React from 'react'
import { Link } from "react-router-dom";

const GroupCard = props => {

    const detailsLink = `/groups/${props.group.id}`
    
    return(
        <Link to = {detailsLink}>
        <div className='group-card'>
            <div className='group-card-content'>
                <p>{props.group.name}</p>
            </div>
        </div>
        </Link>
    )
}

export default GroupCard