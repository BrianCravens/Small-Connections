import {Form, Button} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'

const GroupForm = props => {
    const [group, setGroup] = useState({"city": "", "address": "", "name": "", "image":"", "schedule": "", "capacity": 0, "kids": false, "state": ""})
    const [isLoading, setIsLoading] = useState(false)


        const handleFieldChange = (event) =>{
            const stateToChange = {...group}
            stateToChange[event.target.id]=event.target.value;
            setGroup(stateToChange) 
        }

        const handleCreate=(event)=> {
            event.preventDefault()
            setIsLoading(true)
            const newGroup ={
                city: group.city,
                state: group.state,
                address: group.address,
                name: group.name,
                kids: group.kids,
                capacity: parseInt(group.capacity),
                image: group.image,
                schedule: group.schedule
            }
            dataManager.create('groups', newGroup)
            .then(() => {
                const myGroup = {
                    is_approved: true
                }
                dataManager.create('membergroups', myGroup)
                .then(() => {
                    setIsLoading(false)
                    props.history.push('/meetings')
                })
            })
        }
    

    return(

        <Form>

            <Form.Group >
            <Form.Label htmlFor='form-name'>Group Name: </Form.Label>
            <Form.Control id='name' type="text" onChange={handleFieldChange}  placeholder='Title'  className='form-name'/>
            </Form.Group>
    
            <Form.Group >
            <Form.Label htmlFor='form-address'>Address: </Form.Label>
            <Form.Control id='address' type='textarea' onChange={handleFieldChange} placeholder='Address'  className='form-address'/>
            </Form.Group>

            <Form.Group>
            <Form.Label htmlFor='form-city'>City: </Form.Label>
            <Form.Control id='city' type='city' onChange={handleFieldChange} defaultValue={group.city} className='form-city'/>
            </Form.Group>

            <Form.Group >
            <Form.Label htmlFor='form-state'>State: </Form.Label>
            <Form.Control id='state' type='state' onChange={handleFieldChange} defaultValue={group.state} className='form-state'/>
            </Form.Group>
            
            <Form.Group>
            <Form.Label htmlFor='form-schedule'>Schedule: </Form.Label>
            <Form.Control type='text' id='schedule' onChange={handleFieldChange} placeholder='Mondays @ 6:00pm'  className='form-schedule'/>
            </Form.Group>

            <Form.Group>
            <Form.Label htmlFor='form-capacity'>Capacity: </Form.Label>
            <Form.Control type='number' id='capacity' onChange={handleFieldChange}  className='form-capacity'/>
            </Form.Group>

            <Form.Group >
            <Form.Label htmlFor='form-image'>Image: </Form.Label>
            <Form.Control type='url' id='image' onChange={handleFieldChange} placeholder='Image'  className='form-image'/>
            </Form.Group>

            <Form.Group controlId="form-group">
            <Button onClick={()=>(props.history.push('/groups'))}>Cancel</Button>
            </Form.Group>

            <Form.Group controlId="form-group">
            <Button disabled={isLoading} onClick={handleCreate}>Submit</Button>
            </Form.Group>

        </Form>
    )
}
export default GroupForm