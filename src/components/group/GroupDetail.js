import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'


const GroupDetail = props => {
    
    const [group, setGroup] = useState({leader:{user:{}}} )
    const [kids, setKids] = useState(false)
    const haveKids = kids

    const getGroup = () => {
        dataManager.get("groups", props.groupId)
        .then((response) => {
            setGroup(response)
        })
    }

    useEffect(() => {
        getGroup();
    }, [])
    useEffect(() => {
        setKids(group.kids)
        console.log(group);
    }, [group])
    useEffect(() => {
        console.log(kids);
    }, [kids])

    return(
        <>
            <div className="group-details">
                <div className="group-picture-container">
                    <img className="group-picture" alt="Group"  src={group.image}/>
                </div>
                <div className="group-info">
                        <h1>{group.name} Group</h1>
                        <h2>Leader: {group.leader.user.first_name} {group.leader.user.last_name}</h2>
                        <h3>Address: {group.address}, {group.city} {group.state}</h3>
                        <h3>Schedule: {group.schedule}</h3>
                        <h3>Kids: {kids? "YES" : "NO"}</h3>
                </div>
            </div>
        </>
    )
}

export default GroupDetail