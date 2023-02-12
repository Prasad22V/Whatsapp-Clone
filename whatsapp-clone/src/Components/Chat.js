import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import "./chat.css"
import axios from '../axios';

const Chat = ({messages}) => {

    const [input, setInput] = useState("");

const subButton = async (e) =>{
    e.preventDefault()

   await axios.post('/messages/new', {
        message: input,
        name:"prasasfd",
        received: true,
        timestamp: "125"
    });
    setInput('')
}
  return (
   <div className="chat">
    <div className="chat_header">
        <Avatar/>
        <div className="CHATHEADER_INFO">
            <h3>Room name</h3>
            <p>Last seen at</p>
        </div>
        <div className="chat_headerright">
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <AttachFile/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
    </div>
    <div className="chat_body">

     {messages.map((message)=> (

        <p className= {`chat_msg ${message.received && 'chat_reci'}`}>
        <span className='chat_name'>{message.name}</span>
        {message.message}
        <span className='chat_time'>{message.timestamp}</span>
        </p>
     )
     )}

        {/* <p className='chat_msg chat_reci'>
        <span className='chat_name'>Layana</span>
        This is a message
        <span className='chat_time'>{new Date().toLocaleString()}</span>
        </p> */}

     
    </div>
    <div className="chat_footer">
        
            <InsertEmoticon className='chat_icon'/>

            <form>
                <input type="text"  placeholder='Enter msg' value={input} onChange = {(e) => setInput (e.target.value)}/>
                <button type='submit' onClick={subButton}>
                    send msg
                </button>
            </form>
        <Mic className='chat_icon'/>
    </div>
   </div>
  )
}

export default Chat