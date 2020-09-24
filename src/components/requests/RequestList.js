import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import dataManager from '../../modules/dataManager'
import './Request.css'

const RequestList = props => {
    
    const [requests, setRequests] = useState([]);
    const [toggle, setToggle] = useState(false)

    const getRequests = () =>{
        return dataManager.getAll('membergroups')
            .then((requests)=> {
                setRequests(requests);
            })
            .catch((err) => console.error('There was an issue with getting all requests:', err))
        
    }
   
    useEffect(() =>{
        getRequests();
    }, [toggle])

    return (
        <div>
        {props.toggle? null:
        <div className= 'RequestsList'>
            <h1>Current Requests</h1>
            {requests.map((request)=> (<RequestCard key={request.id} request={request} toggle={toggle} setToggle={setToggle}/>))}
        </div>
        }       
        </div>
    )
}
export default RequestList