import PropTypes from "prop-types";
import { useState } from "react";

export const MessageForm = ({nickname, onSubmit}) => {
    const [state, setState] = useState({
        message: '',
        name: nickname
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.message === '') return;
        onSubmit({...state})
        setState(prevState => ({
            ...prevState,
            message: ''
        }))
    }

    return (
        <form className="form-message">
            <textarea type="text" name='message' placeholder="Message" 
                value={state.message} 
                onChange={handleChange}
                style={{resize: 'none'}}
            />
            <button onClick={handleSubmit}>Send</button>
        </form>
    )
}

MessageForm.propTypes = {
    nickname: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}