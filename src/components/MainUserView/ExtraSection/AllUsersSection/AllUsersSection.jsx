import { useEffect, useState } from "react";
import PopupUserWindow from "./PopupUserWindow/PopupUserWindow";
import './allUsersSection.css'


function AllUsersSection(props) {


    const [allUsers, setAllUsers] = useState()
    const [popupVisibile, setPopupVisible] = useState(false)
    const [popupType, setPopupType] = useState('')
    const [activePopupUser, setActivePopupUser] = useState()

    useEffect(()=>{
            (async function retrieveAllUsers () {
                const url='http://localhost:3000/users/allUsers/';
                const fetchObj = {
                    method: 'GET',
                  }
                try {
                    const response = await fetch(url, fetchObj);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    setAllUsers(json.allUsers)
                } catch (error) {
                    console.error('Unable to retrieve data:', error.message);
                }
            }) ()
        }, [])

    return (
        <div className="allUsersSection">
            <PopupUserWindow setPopupType={setPopupType} popupType = {popupType} popupVisibile = {popupVisibile} activePopupUser = {activePopupUser} userId = {props.userId} alreadyInstantiatedChats = {props.alreadyInstantiatedChats} setActiveChat = {props.setActiveChat} setPopupVisible = {setPopupVisible} setNewChatCreated = {props.setNewChatCreated} />
            <button onClick={()=>{setPopupVisible(true); setPopupType('groupCreation')}}>Create a group chat</button>
            Check out other users:
            {allUsers && allUsers.map(user => (
                user.id !== props.userId &&
                    (<div key={user.id} className="userDiv" onClick={()=>{setPopupVisible(true); setActivePopupUser(user); setPopupType('user')}} >
                        <div className={`username`}>
                            {user.image=== null ? <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#1C274C"></path> <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#1C274C"></path> <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#1C274C"></path> </g></svg>
                            : <img src={user.image} alt="user profile image" /> }
                            <br />
                            {'@ ' + user.username}
                        </div>
                    </div>)
                ))}
        </div>
    )
}

export default AllUsersSection