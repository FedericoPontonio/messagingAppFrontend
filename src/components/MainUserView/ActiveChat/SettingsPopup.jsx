import { useState } from "react"
import UserSearchBar from "../ExtraSection/UserSearchbar/UserSearchBar";


function SettingsPopup(props) {
    const [activeSettingsField, setActiveSettingsField] = useState();
    const [message, setMessage] = useState();

    const setChangeNameAsActiveField = () => setActiveSettingsField('changeName');

    async function renameChat(chatId, newName) {
        const url = `http://localhost:3000/chat/rename`;
        const fetchObj = {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                "id": chatId,
                "name": newName
            })
        }
        //how do I trigger LeftComponent rerender?
        try { await fetch(url, fetchObj); props.setSettingsOpen(false); props.triggerLeftSectionRerender(); }
        catch (error) { console.log(error) }
    }

    return (
        <div>
            <button onClick={() => setChangeNameAsActiveField()}>Change group chat name</button>
            <br /><br />
            <button onClick={() => setActiveSettingsField('addUserToChat')}>Add a user to the chat</button>
            {activeSettingsField === 'changeName' &&
                <>
                    <label htmlFor="Group Name">New Group Name</label>
                    <input type="text" name="Group Name" />
                    <button onClick={async () => { if (document.querySelector('input').value.length > 0) { await renameChat(props.activeChatObject.chatId, document.querySelector('input').value); alert("Chat name changed") } else { alert("Please enter a name") } }}>Submit changes</button>
                </>
            }
            {activeSettingsField === 'addUserToChat' && 
                <UserSearchBar />
            }


            <button onClick={() => props.setSettingsOpen(false)}>return</button>
            <p>You can only make one field change at a time.</p>
        </div>
    )
}

export default SettingsPopup


