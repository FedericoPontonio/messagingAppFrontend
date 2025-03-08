import { Link, useNavigate } from "react-router-dom";




function SignUpView(props) {
    const navigate = useNavigate(); // Hook for navigation


    async function createUser() {
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        const confirmPassword = document.querySelector('#confirmPassword').value
        const url = 'http://localhost:3000/users/';
        const fetchObj = {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword
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
          navigate("/"); // Redirect to home
        } catch (error) {
          console.error(error.message);
          props.sendFeedbackMessage(error.message, 'negative');
        }    
      } 

    return (
        <> 
        {/*style need to change or refactor to account for all forms */}
        <div className="loginView">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"/>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" />
            <button onClick={()=>createUser()}>Sign in</button>
        </div>       

        <Link to='/login'>go back to login page</Link>
        </>
    )
}

export default SignUpView