import {Form, Button} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'

const MeetingForm = props => {
    const [meeting, setMeeting] = useState({"date": "", "content": "", "title": "", "image":"", "url": ""})
    const [isLoading, setIsLoading] = useState(false)




        const handleFieldChange = (event) =>{
            const stateToChange = {...meeting}
            console.log(event.target)
            stateToChange[event.target.id]=event.target.value;
            setMeeting(stateToChange) 
        }

        const handleCreate=(event)=> {
            event.preventDefault()
            setIsLoading(true)
            const newMeeting ={
                date: meeting.date,
                content: meeting.content,
                title: meeting.title,
                image: meeting.image,
                url: meeting.url
            }
            dataManager.create('meetings', newMeeting)
            .then(() => {
                setIsLoading(false)
                props.history.push('/meetings')
            })
        }
    

    return(

        <Form>
                    <Form.Group >
                    <Form.Label htmlFor='form-title'>Title: </Form.Label>
                    <Form.Control id='title' type="text" onChange={handleFieldChange}  placeholder='Title'  className='form-title'/>
                    </Form.Group>
            
                    <Form.Group >
                    <Form.Label htmlFor='form-content0'>Content: </Form.Label>
                    <Form.Control id='content' type='textarea' onChange={handleFieldChange} placeholder='Content'  className='form-content'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-date'>Date: </Form.Label>
                    <Form.Control id='date' type='date' onChange={handleFieldChange} defaultValue={meeting.date} className='form-date'/>
                    </Form.Group><Form.Group>
                    <Form.Label htmlFor='form-url'>URL: </Form.Label>

                    <Form.Control type='url' id='url' onChange={handleFieldChange} placeholder='URL'  className='form-url'/>
                    </Form.Group>
                    <Form.Group >
                    <Form.Label htmlFor='form-image'>Image: </Form.Label>

                    <Form.Control type='text' id='image' onChange={handleFieldChange} placeholder='Image'  className='form-image'/>
                    </Form.Group>
                    <Form.Group controlId="form-meeting">
                    <Button onClick={()=>(props.history.push('/meetings'))}>Cancel</Button>
                    </Form.Group>
                    <Form.Group controlId="form-meeting">
                    <Button disabled={isLoading} onClick={handleCreate}>Submit</Button>
                    </Form.Group>

            </Form>
    )
}
export default MeetingForm