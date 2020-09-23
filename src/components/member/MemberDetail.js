import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'
import {Form, FormGroup, Label, Input, Button, FormControl} from 'react-bootstrap'

const MemberDetail = props => {
    
    const [member, setMember] = useState({user:{}})
    const [editMember, setEditMember] = useState({user:{}})
    const [editUser, setEditUser] = useState({})
    const [group, setGroup] = useState({})
    const [currentMember, setCurrentMember] = useState({})
    const [myGroup, setMyGroup] = useState({group:{leader:{}}})
    const [memberGroups, setMemberGroups] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [render, setRender] = useState(false)
    const [admin, setAdmin] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user"))


    const getCurrentMember = () => {
        dataManager.get('members', currentUser)
        .then((member) => {
            setCurrentMember(member)
        })
        .catch((err) => console.error('There was an issue with getting that member:', err))
    }

    const getMemberGroups = () =>{
        return dataManager.getAll('membergroups/listall')
            .then((membergroups)=> {
                setMemberGroups(membergroups);
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }
    const getMemberGroupID = () =>{
        memberGroups.map(group=> {
            if(parseInt(group.member.id) === member.id && group.is_approved === true){
                setMyGroup(group)
            }
        })
        
    }
    const getGroup=()=>{
        if(myGroup.group_id !=null){
        
        dataManager.get('groups', myGroup.group_id)
        .then((group) => {
            setGroup(group)
        })}
    }

    const makeAdmin = () => {
        const editAdmin={
            id: member.id,
            first_name: member.user.first_name,
            last_name: member.user.last_name,
            email: member.user.email,
            address: member.address,
            phone: member.phone,
            birthday: member.birthday,
            image: member.image,
            is_admin: true
        }
        dataManager.update('members', editAdmin)
        .then(() => {
            setIsLoading(false)
            props.history.push('/members')
        })
        .catch((err) => console.error('There was an issue with updating that memeber:', err))
    }

    const getMember = () => {
        dataManager.get("members", props.match.params.memberId)
        .then((response) => {
            setMember(response)
            setEditMember(response)
            setEditUser(response.user)
        })
        .catch((err) => console.error('There was an issue with getting that member:', err))
    }
    const handleFieldChange = (event) =>{
        const stateToChange = {...editMember}
        stateToChange[event.target.id]=event.target.value;
        setEditMember(stateToChange) 
    }
    const handleUserFieldChange = (event) =>{
        const stateToChange = {...editUser}
        stateToChange[event.target.id]=event.target.value;
        setEditUser(stateToChange) 
    }
    const handleEdit=(event)=> {
        event.preventDefault()
        setIsLoading(true)
        console.log(editMember.address)
        const editedMember ={
            id: member.id,
            first_name: editUser.first_name,
            last_name: editUser.last_name,
            email: editUser.email,
            address: editMember.address,
            phone: editMember.phone,
            birthday: editMember.birthday,
            image: editMember.image,
            is_admin: member.is_admin
        }
        dataManager.update('members', editedMember)
        .then(() => {
            setIsLoading(false)
            setToggle(!toggle)
        })
        .catch((err) => console.error('There was an issue with updating that member:', err))
    }

    const leaveGroup=()=>{
        if(myGroup.id === undefined){
            alert('You are not in a group')
        }else if(myGroup.group.leader.id === member.id){
            alert('They are the Leader!!')
        }
        else{
        dataManager.delete('membergroups', myGroup.id)
        .then(() => {
            setIsLoading(false)
            props.history.push('/groups')
        })
        .catch((err) => console.error('There was an issue with deleting membergroup:', err))
    }
    }
    const makeLeader=()=>{
        const editedGroup={
            id: myGroup.group.id,
            leader_id: member.id
        }
        dataManager.update('groups', editedGroup)
        .then(() => {
            setIsLoading(false)
            props.history.push('/members')
        })
        .catch((err) => console.error('There was an issue with updating leader:', err))
    }

    useEffect(() => {
        getMember();
    }, [toggle])
    useEffect(() => {
        getMember();
    }, [render])
    useEffect(() => {
        getCurrentMember();
    }, [])
    useEffect(() => {
        getMemberGroups();
    }, [])
    useEffect(() => {
        setAdmin(member.is_admin)
    }, [currentMember])
    useEffect(() => {
        getMemberGroupID()
    }, [memberGroups])
    useEffect(() => {
        getGroup()
        console.log(myGroup)
    }, [myGroup])

    return(
        <>
            {toggle?
            
            <Form>
                    <Form.Group >
                    <Form.Label htmlFor='form-first-name'>First Name: </Form.Label>
                    <Form.Control id='first_name' type="text" onChange={handleUserFieldChange}  placeholder='First Name' defaultValue={member.user.first_name} className='form-first-name'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-last-name'>Last Name: </Form.Label>
                    <Form.Control id='last_name' type="text" onChange={handleUserFieldChange}  placeholder='Last Name' defaultValue={member.user.last_name} className='form-last-name'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-email'>Email: </Form.Label>
                    <Form.Control id='email' type="email" onChange={handleUserFieldChange}  placeholder='Email' defaultValue={member.user.email} className='form-email'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-address'>Address: </Form.Label>
                    <Form.Control id='address' type="address" onChange={handleFieldChange}  placeholder='Address' defaultValue={member.address} className='form-address'/>
                    </Form.Group>
            
                    <Form.Group >
                    <Form.Label htmlFor='form-phone'>Phone: </Form.Label>
                    <Form.Control id='phone' type='phone' onChange={handleFieldChange} placeholder='Content' defaultValue={member.phone} className='form-phone'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-date'>Birthday: </Form.Label>
                    <Form.Control id='birthday' type='date' onChange={handleFieldChange} defaultValue={member.birthday} className='form-date'/>
                    </Form.Group>

                    <Form.Group >
                    <Form.Label htmlFor='form-image'>Image: </Form.Label>
                    <Form.Control type='text' id='image' onChange={handleFieldChange} placeholder='Image' defaultValue={member.image} className='form-image'/>
                    </Form.Group>

                    <Form.Group controlId="form-meeting">
                    <Button disabled={isLoading} onClick={()=>setToggle(!toggle)}>Back</Button>
                    </Form.Group>

                    <Form.Group controlId="form-meeting">
                    <Button disabled={isLoading} onClick={handleEdit}>Submit</Button>
                    </Form.Group>

            </Form>
            :
            <div className="member-details">
                <div className="member-picture-container">
                    <img className="member-picture" alt="Member"  src={member.image}/>
                </div>
                <div className="member-info">
                        <h1>{member.user.first_name} {member.user.last_name}</h1>
                        <h3>{member.address}</h3>
                        <h3>{member.phone}</h3>
                        <h3>{member.user.email}</h3>
                        <h3>{member.birthday}</h3>
                        <h3>Group: {myGroup.group.name}</h3>
                </div>
                {currentUser===member.id || currentMember.is_admin?
                <button disabled={isLoading} onClick={()=>setToggle(!toggle)}>Edit</button>
                :null}
                {currentUser===member.id || myGroup.group.leader.id === currentUser?
                <button disabled={isLoading} onClick={()=>leaveGroup()}>Leave Group</button>
                :null}

                {currentMember.is_admin && member.is_admin===false ? <Button onClick={makeAdmin}>Make Admin</Button>:null}
                
                {myGroup.group.leader.id === currentUser && myGroup.group.leader.id != member.id? <Button onClick={makeLeader}>Make Leader</Button>:null}
            </div>
            }
        </> 
    )
}

export default MemberDetail