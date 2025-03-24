import { useEffect, useState } from "react";
import './ActiveChat.css';
import PropTypes from 'prop-types';
import SettingsPopup from "./SettingsPopup";

ActiveChat.propTypes = {
    userId : PropTypes.number,
    activeChat : PropTypes.number
}


function ActiveChat (props) {

    const [messages, setMessages] = useState([])
    const [activeChatObject, setActiveChatObject] = useState()
    const [settingsOpen, setSettingsOpen] = useState(false)

    function evaluateUser (userId) {
        if ( userId != props.userId) {
            return 'ulteriorChatPartecipants'
        }
        else {
            return 'userMessageStyle'
        }
    }

    //deployment version
    useEffect(()=>{
        (async function retrieveMessageByActiveChat () {
            const url='http://localhost:3000/messages/'+ props.activeChat;
            const fetchObj = {
                method: 'GET',
              }
            try {
                const response = await fetch(url, fetchObj);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                setMessages(json)
            } catch (error) {
                console.error('Unable to retrieve data:', error.message);
            }
        }) ();
        (function retrieveActiveChatObject() {
            const result = props.chats.find((chat)=>chat.chatId === props.activeChat)
            setActiveChatObject(result)
        }) ()
    }, [props.activeChat])

    //testing version
    // useEffect(()=>{
    //     async function retrieveMessageByActiveChat () {
    //         const url='http://localhost:3000/messages/'+ props.activeChat;
    //         const fetchObj = {
    //             method: 'GET',
    //           }
    //         try {
    //             const response = await fetch(url, fetchObj);
    //             if (!response.ok) {
    //                 throw new Error(`Response status: ${response.status}`);
    //             }
    //             const json = await response.json();
    //             setMessages(json)
    //             console.log(props.activeChat)
    //         } catch (error) {
    //             console.error('Unable to retrieve data:', error.message);
    //         }
    //     }
    //     retrieveMessageByActiveChat()
    //     const scrollbar = document.querySelector('.messagesHistory');
    //     scrollbar.scrollTop = scrollbar.scrollHeight;
    //     setInterval(() => {
    //         retrieveMessageByActiveChat()

    //     }, 2000);
    // }, [props.activeChat])


    async function sendMessage() {
        const inputValue = document.querySelector('#inputMessage').value
        const url = 'http://localhost:3000/messages';
        const fetchObj = {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            "chatId": props.activeChat,
            "userId": props.userId,
            "value": inputValue
          })
        }


        try {
          const response = await fetch(url, fetchObj);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.message || `Response status: ${response.status}`);
          }
          console.log(response)
          props.sendFeedbackMessage(json.message, 'positive')
        } catch (error) {
          console.error(error.message);
          props.sendFeedbackMessage(error.message, 'negative');
        }    
      } 


    return(
        <div className="activeChat">
            {props.activeChat && !settingsOpen && <>
            {activeChatObject && activeChatObject.isGChat && <button onClick={()=>setSettingsOpen(true)}>Settings</button>}
                <div className="messagesHistory">
                {messages.data &&
                (messages.data.map(message => (
                    <div key={message.id} className="messageDiv">
                        <div className={`messageValue ${evaluateUser(message.authorId)}`}>
                            {message.value}
                        </div>
                    </div>
                ))
            
            )
                
                }
            </div>
            
            <div className="newMessageInputDiv">
                <input id="inputMessage" type="text" />
                <button onClick={()=>sendMessage()}>Send</button>
            </div>
            </>
            }

            {settingsOpen && <SettingsPopup isSettingsOpen = {settingsOpen} setSettingsOpen = {setSettingsOpen} activeChat = {props.activeChat} activeChatObject = {activeChatObject} triggerLeftSectionRerender = {props.setNewChatCreated} />}
            {!props.activeChat && <>
                <div className="noActiveChat">
                    Welcome to your chat interface. <br />
                    -select a contact of your to resume a chat.
                    -select a new contact to start a new chat
                </div>
            </>}
        </div>

    )
}

export default ActiveChat
