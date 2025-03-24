import { useState } from "react";



function UserSearchBar (props) {

    const [searchParameter, setSearchParameter] = useState()

    async function retrieveMatchingUsers() {
        const url = 'http://localhost:3000/users';
        const fetchObj = {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            "username": searchParameter,
          })
        }
    
        try {
          const response = await fetch(url, fetchObj);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.message || `Response status: ${response.status}`);
          }
          console.log(response)
        } catch (error) {
          console.error(error.message);
        }    
      } 



    return (
        <div>
            <input type="text" id="userSearchBar" placeholder="Search for a user..."
            onChange={()=>setSearchParameter(document.querySelector('#userSearchBar').value)}
            />
        </div>
    )
}

export default UserSearchBar