import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap'
import PrayerCard from './PrayerCard';
import dataManager from '../../modules/dataManager'
import './Prayer.css'


const MessageList = props => {
    
    const [prayers, setPrayers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState({id: null, description: undefined})

    

    const getPrayers = () =>{
        return dataManager.getAll('prayers')
            .then((prayers)=> {
                setPrayers(prayers);
            })
            .catch((err) => console.error('There was an issue with getting all prayers:', err))
            
        }

    const handleFieldChange = (event) =>{
        const stateToChange = {...text}
        stateToChange[event.target.id]=event.target.value;
        setText(stateToChange) 
    }
    const handleEdit = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        if (text.description === undefined){setIsLoading(false)}
        else if (text.id !=null){
            const editedMessage = {
                id: text.id,
                description: text.description
            }
            dataManager.update('prayers', editedMessage)
            .then(() => {
                setIsLoading(false)
                setText()
                setToggle(!toggle)
            })}else{
                const newMessage = {
                    description: text.description
                }
                dataManager.create('prayers', newMessage)
                .then(() => {
                    setIsLoading(false)
                    setText()
                    setToggle(!toggle)
                })    

            }
    }

     useEffect(() =>{
        getPrayers();
    }, [toggle])

    return (
        <div>
        {props.toggle? null:
        <div className= 'PrayersList'>
            <h1>Prayer Requests</h1>
            
            {prayers.map((prayer, idx)=> (<PrayerCard setText={setText} key={idx} prayer={prayer} toggle={toggle} setToggle={setToggle}/>))}
            
        <textarea id='description' value={text?text.description:""} onChange={handleFieldChange} className='prayer-textarea' type='text' placeholder='Enter Message'></textarea>
            <Button onClick={handleEdit} disabled={isLoading} className='send-prayer'>Send</Button>
        </div>
        }       
        </div>
        
    )
}
export default MessageList