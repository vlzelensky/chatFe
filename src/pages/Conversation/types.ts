export interface Room {
  _id: string;
  messages: [];
}

export interface Message {
  message: string;
  owner: string;
  date: string;
}
