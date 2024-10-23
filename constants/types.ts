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

  // src/types/activity.ts

export enum ActivityType {
  JOB_POSTED = "JOB_POSTED",
  JOB_APPLIED = "JOB_APPLIED",
  RATING_RECEIVED = "RATING_RECEIVED",
  RATING_GIVEN = "RATING_GIVEN",
  NEW_MESSAGE = "NEW_MESSAGE",
}

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  // Additional fields based on activity type
  // For example, message sender, job details, rating value, etc.
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string; // URL or local asset path
}