import PropTypes from "prop-types"
import { useEffect, useState } from "react";

export const ActiveUsers = ({ messages }) => {
    const [usersCount, setUsersCount] = useState(0);

    const systemMessages = messages.filter(message => message.name === 'SYSTEM');

    useEffect(() => {
        const usersCount = systemMessages.length ? systemMessages[0].usersCount : 0;
        setUsersCount(usersCount);
    }, [setUsersCount, systemMessages])

    return (
        <div className="active-users">
            Active users in chat: {usersCount}
        </div>
    )
}

ActiveUsers.propTypes = {
    messages: PropTypes.array.isRequired
}