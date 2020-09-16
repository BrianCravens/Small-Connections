import React, {useState} from 'react'
import { Link } from "react-router-dom";
import dataManager from '../../modules/dataManager'

const RequestCard = props => {

    const [isLoading, setIsLoading] = useState(false)
    const detailsLink = `/members/${props.request.member.id}`
    
    const handleDelete = (id) => {
        setIsLoading(true)
        dataManager.delete('membergroups', id)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })
    }

    const handleUpdate = (id) => {
        setIsLoading(true)
        const updateRequest = {
            id: id,
            is_approved: true
        }
        dataManager.update('membergroups', updateRequest)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })
    }


    return(
        <div className='request-card'>
            <div className='request-card-content'>
                <Link to = {detailsLink}>
                <img src={props.request.member.image} height={200} width={240} alt={props.request.member.id} />
                <p>{props.request.member.user.first_name} {props.request.member.user.last_name}</p>
                </Link>
                <button id= {`Accept-${props.request.member.id}`} disabled={isLoading}onClick={()=>handleUpdate(props.request.id)}>Accept</button>
                <button id= {`Deny-${props.request.member.id}`} disabled={isLoading} onClick={()=>handleDelete(props.request.id)}>Deny</button>
            </div>
        </div>
        
    )
}

export default RequestCard