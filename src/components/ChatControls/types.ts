import { Socket } from 'socket.io-client';

export interface ChatControlsProps {
  socket: Socket;
  userId: string;
  roomId: string;
}
