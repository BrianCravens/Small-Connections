import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import dataManager from '../../modules/dataManager'
import './Prayer.css'

const PrayerCard = props => {

    const [isLoading, setIsLoading] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user"))
    var myStuff = ""
    if(currentUser===props.prayer.member.id){
         myStuff = props.prayer
    }else{
         myStuff = ""
    }
    const handleDelete = (id) => {
        setIsLoading(true)
        dataManager.delete('prayers', id)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })
    }

    return(
        <div className='prayer-card'>
            <div onClick={()=>props.setText(myStuff)}  className='prayer-card-content'>
                <img src={props.prayer.member.image} alt={props.prayer.member.id} />
                <div className='prayer-name'>{props.prayer.member.user.first_name} {props.prayer.member.user.last_name}</div>
                {currentUser===props.prayer.member.id || currentUser===props.prayer.group.leader.id?
                <Button className='btn-danger' id= {`Deny-${props.prayer.member.id}`} disabled={isLoading} onClick={()=>handleDelete(props.prayer.id)}>Delete</Button>
                :null}
            </div>
                <p>{props.prayer.description}</p>
                <div>{props.prayer.date}</div>
        </div>
        
    )
}

export default PrayerCard