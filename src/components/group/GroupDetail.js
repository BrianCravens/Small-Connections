import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'
import {Form, FormGroup, Label, Input, Button, FormControl} from 'react-bootstrap'



const GroupDetail = props => {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState({leader:{user:{}}} )
    const [editGroup, setEditGroup] = useState({leader:{user:{}}} )
    const [memberGroups, setMemberGroups] = useState([{member:{}}])
    const [kids, setKids] = useState(false)
    const [inGroup, setInGroup] = useState(false)
    const [isLeader, setIsLeader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(false);

    const currentUser = parseInt(localStorage.getItem("user"));


    const getGroups = () =>{
        return dataManager.getAll('groups')
            .then((groups)=> {
                setGroups(groups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    const getMemberGroups = () =>{
        return dataManager.getAll('membergroups/listall')
            .then((membergroups)=> {
                setMemberGroups(membergroups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }

    const getGroup = () => {
        dataManager.get("groups", props.groupId)
        .then((response) => {
            setGroup(response)
            setEditGroup(response)
        })
    }
    const checkLeader = () => {
        setIsLeader(false)
        groups.map(group=>{
            if (parseInt(group.leader.id) === currentUser){
                setIsLeader(true)
                setInGroup(true)
            }
        })
    }
    const isInGroup = () => {
        memberGroups.map(group=>{
            if (parseInt(group.member.id) === currentUser&&group.is_approved===true){
                setInGroup(true)
            }
        })
    }
    
    const handleJoin= () => {
        const myGroup = {
            group_id: group.id
        }
        dataManager.create('membergroups', myGroup)
        .then(() => {
            props.history.push('/messages')
        })
    }
    const handleFieldChange = (event) =>{
        const stateToChange = {...editGroup}
        stateToChange[event.target.id]=event.target.value;
        setEditGroup(stateToChange) 
    }

    const handleEdit=(event)=> {
        event.preventDefault()
        setIsLoading(true)
        const editedGroup ={
            id: group.id,
            name: editGroup.name,
            address: editGroup.address,
            schedule: editGroup.schedule,
            city: editGroup.city,
            state: editGroup.state,
            image: editGroup.image,
            kids: kids
            
        }
        dataManager.update('groups', editedGroup)
        .then(() => {
            setIsLoading(false)
            setToggle(!toggle)
        })
    }

    useEffect(() => {
        getGroup();
    }, [])
    useEffect(() => {
        getGroup();
    }, [toggle])

    useEffect(() => {
        getGroups();
    }, [])
    useEffect(() => {
        getMemberGroups();
    }, [])
    useEffect(() => {
        setKids(group.kids)
    }, [group])
    useEffect(() => {
        isInGroup();
    }, [memberGroups])
    useEffect(() => {
        checkLeader();
    }, [groups])
   

    return(
        <>
            {toggle?
            
            <Form>
                    <Form.Group >
                    <Form.Label htmlFor='form-name'>Name: </Form.Label>
                    <Form.Control id='name' type="text" onChange={handleFieldChange}  placeholder='Group Name' defaultValue={group.name} className='form-name'/>
                    </Form.Group>


                    <Form.Group >
                    <Form.Label htmlFor='form-address'>Address: </Form.Label>
                    <Form.Control id='address' type="address" onChange={handleFieldChange}  placeholder='Address' defaultValue={group.address} className='form-address'/>
                    </Form.Group>
            
                    <Form.Group >
                    <Form.Label htmlFor='form-city'>City: </Form.Label>
                    <Form.Control id='city' type='text' onChange={handleFieldChange} placeholder='City' defaultValue={group.city} className='form-city'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-city'>State: </Form.Label>
                    <Form.Control id='state' type='text' onChange={handleFieldChange} placeholder='State' defaultValue={group.state} className='form-state'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-schedule'>Schedule: </Form.Label>
                    <Form.Control id='schedule' type='text' onChange={handleFieldChange} defaultValue={group.schedule} className='form-schedule'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-image'>Image: </Form.Label>
                    <Form.Control type='text' id='image' onChange={handleFieldChange} placeholder='Image' defaultValue={group.image} className='form-image'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-kids'>Kids: </Form.Label>
                    <Form.Control type='checkbox' id='kids' onChange={()=> setKids(!kids)} placeholder='Image'defaultChecked={group.kids} className='form-kids'/>
                    </Form.Group>

                    <Form.Group controlId="form-meeting">
                    <Button disabled={isLoading} onClick={()=>setToggle(!toggle)}>Back</Button>
                    </Form.Group>

                    <Form.Group controlId="form-meeting">
                    <Button disabled={isLoading} onClick={handleEdit}>Submit</Button>
                    </Form.Group>

            </Form>
            :
        
            <div>
            {props.toggle? null:
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
                        {inGroup != true ?
                        <Button onClick={handleJoin}>Join Group</Button>
                        : null} 
                        {group.leader.id === currentUser?               
                        <Button disabled={isLoading} onClick={()=>setToggle(!toggle)}>Edit</Button>:null}               
                </div>
            </div>
            }       
            </div>
            }
        </>
    )
}

export default GroupDetail