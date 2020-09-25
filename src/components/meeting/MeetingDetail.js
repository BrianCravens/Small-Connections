import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'
import 'bootstrap/dist/css/bootstrap.css'
import {Form, FormGroup, Label, Input, Button, FormControl} from 'react-bootstrap'



const MeetingDetail = props => {
    
    const [meeting, setMeeting] = useState({member:{user:{}}})
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [editMeeting, setEditMeeting] = useState({member:{user:{}}})
    const currentUser = parseInt(localStorage.getItem("user"))


    const getMeeting = () => {
        dataManager.get("meetings", props.match.params.meetingId)
        .then((response) => {
            setMeeting(response)
            setEditMeeting(response)
        })
    }
    const handleFieldChange = (event) =>{
        const stateToChange = {...editMeeting}
        stateToChange[event.target.id]=event.target.value;
        setEditMeeting(stateToChange) 
    }
    const handleEdit=(event)=> {
        event.preventDefault()
        setIsLoading(true)
        const editedMeeting ={
            id: editMeeting.id,
            date: editMeeting.date,
            content: editMeeting.content,
            title: editMeeting.title,
            image: editMeeting.image,
            url: editMeeting.url
        }
        dataManager.update('meetings', editedMeeting)
        .then(() => {
            setIsLoading(false)
            setToggle(!toggle)
        })
    }
    const handleDelete = (id) => {
        setIsLoading(true)
        dataManager.delete('meetings', id)
        .then(() => {
            setIsLoading(false)
            props.history.push('/meetings')

        })
    }
    

    useEffect(() => {
        getMeeting();
    }, [toggle])

    return(
        <div>  
            {toggle?
            
            <Form>
                                    <h1>Edit Meeting</h1>
                    <div className='form-container'>
                    <Form.Group >
                    <Form.Label htmlFor='form-title'>Title: </Form.Label>
                    <Form.Control id='title' type="text" onChange={handleFieldChange}  placeholder='Title' defaultValue={meeting.title} className='form-title'/>
                    </Form.Group>
            
                    <Form.Group >
                    <Form.Label htmlFor='form-content'>Content: </Form.Label>
                    <Form.Control id='content' type='textarea' onChange={handleFieldChange} placeholder='Content' defaultValue={meeting.content} className='form-content'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-date'>Date: </Form.Label>
                    <Form.Control id='date' type='date' onChange={handleFieldChange} defaultValue={meeting.date} className='form-date'/>
                    </Form.Group><Form.Group>
                    <Form.Label htmlFor='form-url'>URL: </Form.Label>

                    <Form.Control type='url' id='url' onChange={handleFieldChange} placeholder='URL' defaultValue={meeting.url} className='form-url'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-image'>Image: </Form.Label>

                    <Form.Control type='text' id='image' onChange={handleFieldChange} placeholder='Image' defaultValue={meeting.image} className='form-image'/>
                    </Form.Group>

                    <div className='form-button-container'>
                    <Form.Group controlId="form-meeting">

                    <Button onClick={()=>setToggle(!toggle)}>Back</Button>
                    </Form.Group>
                    <Form.Group controlId="form-meeting">
                    <Button className='btn-success' onClick={handleEdit}>Submit</Button>
                    </Form.Group>
                    </div>
                    </div>

            </Form>
            :
            <div className="meeting-details">
                <div className='meeting-info'>
                    <div className="meeting-picture-container">
                        <img className="meeting-picture" alt="Meeting-img"  src={meeting.image}/>
                    </div>
                    <div className="details">
                        <h1>{meeting.title}</h1>

                        <label htmlFor='date'>Date:</label>
                        <div name='date'>{meeting.date}</div>

                        <label htmlFor='leader'>Leader:</label>
                        <div name='leader'>{meeting.member.user.first_name} {meeting.member.user.last_name}</div>

                        <div><a href={meeting.url}>Link to Message</a></div>

                        <label htmlFor='content'>Content:</label>
                        <div name='content'>{meeting.content}</div>
                    </div>
                </div>
                    <div className="meeting-button-container">
                        <Button className='btn-danger' onClick={()=>{handleDelete(meeting.id)}}>Delete</Button>
                        <Button className='btn-primary'onClick={()=>setToggle(!toggle)}>Edit</Button>
                    </div>
            </div>
            }
            
            
             
        </div>
    )
}

export default MeetingDetail