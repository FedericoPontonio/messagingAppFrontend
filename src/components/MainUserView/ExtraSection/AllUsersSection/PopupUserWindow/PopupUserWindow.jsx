
import './PopupUserWindow.css'


function PopupUserWindow (props) {

    const popupVisibile = ()=>{
        if (props.popupVisibile) {
            return 'popupVisible'
        }
        else {
            return 'popupInvisible'
        }
    }

    //add function for creating a new chat with this user and display the feedback message

    //creates a new chat and returns its id
    async function createNewChat (chatName = '') {
        try {
            const newChatResponse = await fetch(' http://localhost:3000/chat', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({"name": chatName})
              })
              const json = await newChatResponse.json()
              return json.newChat.id
        } catch (error) {
            console.error(error.message);
        }
    } 

    async function addUserToChat(chatId, userId) {
        try {
            const response = await fetch('http://localhost:3000/chat/addUser', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({"chatId": chatId, "userId": userId})
              })
              const json = await response.json()
              return json.message
        } catch (error) {
            console.error(error.message);
        }
    }

    async function createNewChatWithSelectedUser() {
        const newChatId = await createNewChat();
        addUserToChat(newChatId, props.userId);
        addUserToChat(newChatId, props.activePopupUser.id);
    }

    const shouldDisplayButton = ()=>{
        props.activePopupUser &&
        !props.alreadyInstantiatedChats.some(
        (chat) => chat.chatName === props.activePopupUser.username
        );
    }


    const chatIdToRedirect = ()=> {
        props.activePopupUser &&
        props.alreadyInstantiatedChats.find(
            (element) => element.chatName === props.activePopupUser.username
        )?.chatId
    }


    const contentForUserPopup = 
        <div className={`PopupUserWindow ${popupVisibile()} popupTypeUser`}>
            <button onClick={()=>{props.setPopupVisible(false); props.setPopupType('');}} className='closeWindowButton'>X</button>
            {props.popupVisibile && props.activePopupUser && 
            (<>
            <div>
                {props.activePopupUser.username}
            </div>

            <div>
                {/* {props.activePopupUser.bio} */}
                {'placeholder for ' + props.activePopupUser.username + "'s bio"}
            </div>
            {
                shouldDisplayButton &&
                (
                    <button onClick={()=> {createNewChatWithSelectedUser();props.setPopupVisible(false); props.setNewChatCreated(true)}}>Chat with them</button>
                )
            }
            {
                !shouldDisplayButton && 
                (
                    <p>You already have a chat with {props.activePopupUser.username}! <button onClick={()=>{props.setActiveChat(chatIdToRedirect);props.setPopupVisible(false)}}>Check it out</button></p>
                )
            }
            </>)
            }
        </div>;
    const contentForGroupCreation = <div className={`PopupUserWindow ${popupVisibile()} popupTypeGroupCreation`}>
            <button onClick={()=>{props.setPopupVisible(false); props.setPopupType('');}} className='closeWindowButton'>X</button>
            {props.popupVisibile && 
            (<>
            <form onSubmit={async (e)=>{
                if (!e.target.checkValidity()) return
                e.preventDefault();
                const newChatId = await createNewChat(document.querySelector('#newChatName').value);
                await addUserToChat(newChatId, props.userId);
                props.setActiveChat(newChatId);
                props.setPopupVisible(false);
                props.setNewChatCreated(true);
                }}>
                <label htmlFor="name">How do you want to name the group?</label>
                <input type="text" name="newChatName" id='newChatName' minLength={2} required /> 
                <div>{"Note: You can add users to the group later"}</div>
                <button type='submit'>Create</button>
            </form>
            
            </>)
            }
        </div>;

    return (
        <>
            {props.popupType === 'user' && contentForUserPopup}
            {props.popupType === 'groupCreation' && contentForGroupCreation}
        </>

    )
}

export default PopupUserWindow