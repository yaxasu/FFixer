export interface Message {
    id: string;
    sender_id: number;
    content: string;
    timestamp: string;
    is_read: boolean;
  }
  
  export interface UserBasic {
    id: number;
    email: string;
    avatar: string;
  }
  
  export interface ConversationDetail {
    id: number;
    user1: UserBasic;
    user2: UserBasic;
    last_message?: Message;
  }
  
  export interface ConversationListItem {
    id: number;
    participant: UserBasic;
    lastMessage?: Message;
  }