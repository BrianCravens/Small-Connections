import React, { useState, useEffect } from 'react';
import PrayerCard from './PrayerCard';
import dataManager from '../../modules/dataManager'
import currentUser from "../../hooks/ui/useSimpleAuth"


const MessageList = props => {
    
    const [prayers, setPrayers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState({})

    

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
        const editedMessage = {
            id: text.id,
            description: text.description
        }
        if (text.description === undefined){setIsLoading(false)}
            else if (text.id !=null){
            dataManager.update('prayers', editedMessage)
            .then(() => {
                setIsLoading(false)
                setText()
                setToggle(!toggle)
            })}else{
                dataManager.create('prayers', editedMessage)
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
            <button onClick={handleEdit} disabled={isLoading} className='send-prayer'>Send</button>
        </div>
        }       
        </div>
        
    )
}
export default MessageList