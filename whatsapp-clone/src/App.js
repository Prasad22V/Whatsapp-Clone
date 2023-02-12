import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages, setMessage] = useState([])

  useEffect(() => {
    axios.get("/messages/sync").then(response => {

      setMessage(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('d5d4de5faca409773e28', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessage([...messages , newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }

  }, [messages]) 
  

  console.log(messages);

  return (
    <div className="App">
      <div className="app_body">
        <Sidebar />
        <Chat messages = {messages}/>

      </div>

      {/* Sidebar  */}

      {/* chatbar compo */}
    </div>
  );
}

export default App;
