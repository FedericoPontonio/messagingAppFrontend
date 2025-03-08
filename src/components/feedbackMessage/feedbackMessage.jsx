import { useEffect } from 'react'
import './feedbackMessage.css'
import PropTypes from 'prop-types';

FeedbackMessage.propTypes = {
    messageVisible: PropTypes.bool,
    setmessageVisible: PropTypes.func,
    messageContent: PropTypes.string,
    messageType: PropTypes.string
}


function FeedbackMessage(props) {

    const componentNode = document.querySelector('.feedbackMessage');

    useEffect(()=>{
        if(props.messageVisible) {
            componentNode.style.display = 'block'
            setTimeout(()=>{
                props.setmessageVisible(false);
                componentNode.style.display = 'none'
            }, 2000)
        }
    }, [props.messageVisible])

    return(
        <div className={'feedbackMessage'+ ' ' + props.messageType} >
            {props.messageContent}
        </div>
    )
}

export default FeedbackMessage