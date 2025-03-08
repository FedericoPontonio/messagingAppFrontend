import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";

LoginView.propTypes = {
  sendFeedbackMessage: PropTypes.func,
  setIsTokenValid: PropTypes.func,
};



function LoginView(props) {
  const navigate = useNavigate(); // Hook for navigation

    async function getToken() {
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        const url = 'http://localhost:3000/users/getToken';
        const fetchObj = {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            "username": username,
            "password": password
          })
        }
    
        try {
          const response = await fetch(url, fetchObj);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json.message || `Response status: ${response.status}`);
          }
          localStorage.setItem('token', json.token)
          props.setIsTokenValid(true)
          props.sendFeedbackMessage(json.message, 'positive')
          navigate("/"); // Redirect to home
        } catch (error) {
          console.error(error.message);
          props.sendFeedbackMessage(error.message, 'negative');
        }    
      } 
    

    return(
        <div className="loginView">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"/>
            <button onClick={()=>getToken()}>Login</button>
            <div>not already registered? <Link to='/signup'>sign up</Link></div>
        </div>
    )
}

export default LoginView