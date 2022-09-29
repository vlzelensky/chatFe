import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { observer } from 'mobx-react-lite';
import { ChatControls } from 'components/ChatControls';
import { user } from 'store';
import { Room, Message } from './types';

import './styles.scss';

export const Conversation = observer(() => {
  const [messages, setMessages] = useState<[] | Message[]>([]);
  const [roomId, setRoomId] = useState<string>('');
  const { userId: companionId } = useParams();
  const { id } = user;
  const socket = io('http://localhost:8081');

  useEffect(() => {
    socket.emit('get_room', {
      id,
      companionId,
    });
    return () => {
      socket.emit('leave_room', roomId);
    };
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessages((prevState) => [...prevState, data]);
    });
    socket.on('room', ({ _id, messages: roomMessages }: Room) => {
      setRoomId(_id);
      setMessages(roomMessages);
    });
  }, [socket]);

  const memorizedRoomId = useMemo(() => roomId, [roomId]);

  return (
    <div className='conversation-container'>
      <div className='chat'>
        {messages.map(({ date, message, owner }) => {
          const isMyMessage = id === owner;
          return (
            <div
              className={`chat-message ${
                isMyMessage ? 'send-message' : 'receive-message'
              }`}
              key={message}
            >
              <div
                className={`message-container ${
                  isMyMessage ? 'send' : 'receive'
                }`}
              >
                <span>{new Date(date).toLocaleDateString()}</span>
                <span>{message}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ChatControls socket={socket} userId={id!} roomId={memorizedRoomId} />
    </div>
  );
});
