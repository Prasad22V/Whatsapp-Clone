import { Avatar } from '@mui/material'
import React from 'react'
import "./sidebarchat.css"

const SidebarChat = () => {
  return (
    <div className='sidebarchart'>
        <Avatar/>
        <div className="sidebarchat_info">
            <h2>Room name</h2>
            <p>This is last mssge</p>
        </div>
    </div>
  )
}

export default SidebarChat