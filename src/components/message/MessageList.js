import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap'
import MessageCard from './MessageCard';
import dataManager from '../../modules/dataManager'
import './Message.css'

const MessageList = props => {
    
    const [messages, setMessages] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState({})

    

    const getMessages = () =>{
        return dataManager.getAll('messages')
            .then((messages)=> {
                setMessages(messages);
            })
            .catch((err) => console.error('There was an issue with getting all messages:', err))
            
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
            dataManager.update('messages', editedMessage)
            .then(() => {
                setIsLoading(false)
                setText()
                setToggle(!toggle)
            })
            .catch((err) => console.error('There was an issue with updating message:', err))
        }else{
                dataManager.create('messages', editedMessage)
                .then(() => {
                    setIsLoading(false)
                    setText()
                    // setToggle(!toggle)
                })
                .catch((err) => console.error('There was an issue with creating message:', err))   

            }
    }
    
    useEffect(() =>{
        getMessages();
    }, [text])

    useEffect(() =>{
        getMessages();
    }, [toggle])



    return (
        <>
        {props.toggle? null:
        <div className='Messages-banner'>
            <h1>Messages</h1>
        <div className= 'MessagesList'>
            
            {messages.map((message, idx)=> (<MessageCard setText={setText} key={idx} message={message} toggle={toggle} setToggle={setToggle}/>))}
        <div className= 'message-input-container'>
        <textarea id='description' value={text?text.description:""} onChange={handleFieldChange} className='message-textarea' type='text' placeholder='Enter Message'></textarea>
            <Button onClick={handleEdit} disabled={isLoading} className='send-message'>Send</Button>
        </div>
        </div>
        </div>
        } 
        </>      
        
    )
}
export default MessageList