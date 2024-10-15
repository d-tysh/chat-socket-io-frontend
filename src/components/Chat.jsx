import PropTypes from "prop-types"

export const Chat = ({ items }) => {
    const elements = items.map(item => {
        let styles = null;

        if (item.type === 'you') {
            styles = {backgroundColor: '#CDE8E5'}
        } 
        
        if (item.name === 'SYSTEM') {
            styles = {textAlign: 'center'}
        }

        return <p key={item.id} className="messages-list-item" style={{...styles}}>
            {item.name !== 'SYSTEM' && <b>{item.name}: </b>} {item.message}
        </p>
    })

    return (
        <div className="chat">
            <h2 className="chat-header">CHAT</h2>
            <div className="messages-list">
                { 
                    elements.length ? elements : <p style={{textAlign: 'center'}}>No messages.</p>
                }
            </div>
        </div>
    )
}

Chat.propTypes = {
    items: PropTypes.array.isRequired
}