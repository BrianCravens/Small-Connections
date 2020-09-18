import React, { useState, useEffect } from 'react';
import GroupCard from './GroupCard';
import dataManager from '../../modules/dataManager'

const GroupList = props => {
    const [groups, setGroups] = useState([]);
    
    const getGroups = () =>{
        return dataManager.getAll('groups')
            .then((groups)=> {
                setGroups(groups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    useEffect(() =>{
        getGroups();
    }, [])

    return (
        
            <div>
            {props.toggle? null:
            <div className= 'GroupsList'>
            <h1>Groups</h1>
            {groups.map((group)=> (<GroupCard key={group.id} group={group}/>))}
            </div>
            }       
            </div>
    )
}
export default GroupList