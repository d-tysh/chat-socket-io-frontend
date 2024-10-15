import PropTypes from "prop-types";
import { useState } from "react"

export const NameForm = ({onSubmit}) => {
    const [state, setState] = useState({
        name: ''
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
        if (state.name === '') return;
        onSubmit({...state})
        setState(prevState => ({
            ...prevState,
            name: ''
        }))
    }

    return (
        <form className="form-name">
            <input type="text" name='name' placeholder="Name" onChange={handleChange} />
            <button onClick={handleSubmit}>Join</button>
        </form>
    )
}

NameForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}