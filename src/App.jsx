import { useEffect, useState } from 'react'
import './App.css'
import LoginView from './components/loginView';
import SignUpView from './components/SignUpView';
import MainUserView from './components/MainUserView/MainUserView';
import FeedbackMessage from './components/feedbackMessage/feedbackMessage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {

  const [messageVisible, setmessageVisible] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [messageType, setMessageType] = useState('neutral')
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] =useState(null);


    //call token authentication on change parameter of useEffect. the parameter being the routes, effectively requesting authentication on view changes
  async function validateToken() {
    const url = 'http://localhost:3000/users/authorization';   
    const fetchObj = {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.token}
    }
    try {
      const response = await fetch(url, fetchObj);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      // console.log(json.message)
      setIsTokenValid(true)
      setUserId(json.message.userId)
      return json.message.userId
    } catch (error) {
      console.error('Token validation error:', error.message);
      setIsTokenValid(false);
      setUserId(null)
      return null;
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    validateToken();
    //check if token is valid every 10 minutes
    const interval = setInterval(()=>validateToken(), 600000)
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

//recives the message content as a string and the message type as {'positive', 'negative', 'neutral'}
function sendFeedbackMessage(messageContent, messageType) {
  setmessageVisible(true);
  setMessageContent(messageContent);
  setMessageType(messageType);
}

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <FeedbackMessage
        messageVisible={messageVisible}
        setmessageVisible={setmessageVisible}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        messageType={messageType}
      />

      <Routes>
        {isTokenValid ? (
          <Route path="/" element={<MainUserView userId={userId} validateToken={validateToken} sendFeedbackMessage={sendFeedbackMessage} />} />
        ) : (
          <>
            <Route path="/" element={<LoginView sendFeedbackMessage={sendFeedbackMessage} setIsTokenValid={setIsTokenValid} />} />
            <Route path="login" element={<LoginView sendFeedbackMessage={sendFeedbackMessage} setIsTokenValid={setIsTokenValid} />} />
            <Route path="signup" element={<SignUpView sendFeedbackMessage = {sendFeedbackMessage} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App
