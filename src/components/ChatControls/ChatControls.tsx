import { FC, useState, KeyboardEvent } from 'react';
import { Button, Input } from 'antd';
import { ChatControlsProps } from './types';

import './styles.scss';

export const ChatControls: FC<ChatControlsProps> = ({
  socket,
  userId,
  roomId,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const sendMessage = () => {
    if (inputValue) {
      socket.emit('send_message', {
        room: roomId,
        message: inputValue.trim(),
        date: new Date(),
        owner: userId,
      });
      setInputValue('');
    }
  };

  const handleEnterClick = async (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      await sendMessage();
    }
  };

  return (
    <div className='controls-wrapper'>
      <Input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleEnterClick}
      />
      <Button onClick={sendMessage}>Отправить</Button>
    </div>
  );
};
