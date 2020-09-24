import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
import dataManager from '../../modules/dataManager'
import './Request.css'

const RequestCard = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [memberGroups, setMemberGroups] = useState([])
    const [membergroup, setMemberGroup] = useState(false);
    const detailsLink = `/members/${props.request.member.id}`

    
    const handleDelete = (id) => {
        setIsLoading(true)
        dataManager.delete('membergroups', id)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })
    }
    const getMemberGroup = () => {
        dataManager.getAll('membergroups/listall')
        .then((groups) => {
            setMemberGroups(groups)
        })
    }
    const checkMember = () => {
        memberGroups.map((member)=>{
            if(props.request.member.id === member.member.id){
                console.log ('set to true!')
                setMemberGroup(true)
            }
        })
    }
   
    const handleUpdate = (id) => {
        setIsLoading(true)
        console.log(membergroup)
        if(membergroup === true){
            alert('Member already joined a group')
            dataManager.delete('membergroups', props.request.id)
            .then(() => {
                setIsLoading(false)
                props.setToggle(!props.toggle)
            })
        }else{
        const updateRequest = {
            id: id,
            is_approved: true
        }
        dataManager.update('membergroups', updateRequest)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })}
    }
    useEffect(()=>{
        getMemberGroup()
    },[])
    useEffect(()=>{
        checkMember()
    },[memberGroups])


    return(
        <div className='request-card'>
            <Link to = {detailsLink}>
            <div className='request-card-content'>
                <img src={props.request.member.image} alt={props.request.member.id} />
                <div className="request-name">{props.request.member.user.first_name} {props.request.member.user.last_name}</div>
                {membergroup === true?null:
                <Button className='btn-success' id= {`Accept-${props.request.member.id}`} disabled={isLoading}onClick={()=>handleUpdate(props.request.id)}>Accept</Button>
                }
                <Button className='btn-danger' disabled={isLoading} onClick={()=>handleDelete(props.request.id)}>Deny</Button>
            </div>
            </Link>
        </div>
        
    )
}

export default RequestCard