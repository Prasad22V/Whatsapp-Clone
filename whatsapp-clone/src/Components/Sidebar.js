import React from 'react'
import "./sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar_header">
            <Avatar src='https://thumbs.dreamstime.com/b/handsome-man-black-suit-white-shirt-posing-studio-attractive-guy-fashion-hairstyle-confident-man-short-beard-125019349.jpg'/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon  className='icon'/>
                        
                    </IconButton>
                    <IconButton>
                    <ChatIcon  className='icon'/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon  className='icon'/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined className='searchIcon'/>
                    <input type="text" placeholder='Search or Start new chat'/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>

    )
}

export default Sidebar