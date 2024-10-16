import { useCallback, useEffect, useState } from "react"
import { nanoid } from "nanoid";
import { io } from "socket.io-client";

import { NameForm } from "./components/NameForm"
import { MessageForm } from "./components/MessageForm"
import { Chat } from "./components/Chat"
import { ActiveUsers } from "./components/ActiveUsers";
import { playSound } from "./utils/playSound";

const { VITE_API_URL } = import.meta.env;

const socket = io.connect(VITE_API_URL);

function App() {
  const [nickname, setNickname] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', message => {
      playSound();
      setMessages(prevState => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          name: message.name,
          message: message.message
        }
        return [newMessage, ...prevState];
      });
    })
  }, [setMessages])

  useEffect(() => {
    socket.on('chat-user', message => {
      setMessages(prevState => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          name: message.name,
          message: message.message,
          usersCount: message.usersCount
        }
        return [newMessage, ...prevState];
      });
    })
  }, [setNickname])

  const addNickname = useCallback(({name}) => {
    setNickname(name);
    socket.emit('chat-user', name);
  }, [setNickname]);

  const addMessage = useCallback(({name, message}) => {
    setMessages(prevState => {
      const newMessage = {
        id: nanoid(),
        type: 'you',
        name,
        message
      }
      return [newMessage, ...prevState];
    });

    socket.emit('chat-message', {name, message});
  }, [setMessages]);

  return (
    <div className="container">
      { 
        !nickname ? <NameForm onSubmit={addNickname} /> :
          <>
            <h2>User: {nickname}</h2>
            <MessageForm nickname={nickname} onSubmit={addMessage} />
            <ActiveUsers messages={messages} />
            <Chat items={messages} />
          </>
      }
    </div>
  )
}

export default App
