import { useState } from 'react'
import './MainUserView.css'
import LeftSection from './UserRelatedChats/LeftSection'
import ActiveChat from './ActiveChat/ActiveChat'
import AllUsersSection from './ExtraSection/AllUsersSection/AllUsersSection'

function MainUserView(props) {

    const [activeChat, setActiveChat] = useState()
    const [chats, setChats] = useState([])
    const [newChatCreated, setNewChatCreated] = useState(false);


    return (
        <div className="MainUserView">
            <div>Some Header</div>
            <div>Some other Header</div>
            <button onClick={()=>{localStorage.removeItem('token');window.location.reload()}}>Log out</button>
            <LeftSection userId ={props.userId} validateToken={props.validateToken} setActiveChat = {setActiveChat} chats = {chats} setChats = {setChats} newChatCreated = {newChatCreated} setNewChatCreated = {setNewChatCreated} />
            <ActiveChat chats = {chats} activeChat = {activeChat} userId ={props.userId} sendFeedbackMessage={props.sendFeedbackMessage} setNewChatCreated = {setNewChatCreated} />
            <AllUsersSection userId ={props.userId} alreadyInstantiatedChats = {chats} setActiveChat = {setActiveChat}  newChatCreated = {newChatCreated} setNewChatCreated = {setNewChatCreated} />
        </div>
    )
}

export default MainUserView