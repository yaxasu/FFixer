// ChatScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { getToken, getProfileData } from '@/app/functions/storage';

interface Message {
  sender_id: number;
  content: string;
  timestamp: string;
}

interface ChatScreenProps {
  recipientId: number;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ recipientId }) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [userId, setUserId] = useState<number | null>(null);

  const API_BASE_URL = '192.168.86.20:8000/api/v1';

  useEffect(() => {
    const initializeWebSocket = () => {
      const token = getToken();
      if (!token) {
        console.error('Token not found');
        return;
      }

      const profileData = getProfileData();
      if (!profileData || !profileData.id) {
        console.error('User ID not found in profile data');
        return;
      }

      setUserId(profileData.id);

      const wsUrl = `ws://${API_BASE_URL}/ws?token=${encodeURIComponent(token)}`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
        setConnectionStatus('connected');
      };

      ws.current.onmessage = (e) => {
        const messageData: Message = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };

      ws.current.onerror = (e: Event) => {
        console.error('WebSocket error occurred:', e);
      };

      ws.current.onclose = (e) => {
        console.log('WebSocket connection closed');
        setConnectionStatus('disconnected');
      };
    };

    initializeWebSocket();

    // Reconnect logic
    const reconnectInterval = setInterval(() => {
      if (ws.current && ws.current.readyState !== WebSocket.OPEN) {
        console.log('Attempting to reconnect...');
        initializeWebSocket();
      }
    }, 5000);

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(reconnectInterval);
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && userId !== null) {
      const messageData = {
        recipient_id: recipientId,
        content: input,
      };
      ws.current.send(JSON.stringify(messageData));

      // Add the message to local state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_id: userId,
          content: input,
          timestamp: new Date().toISOString(),
        },
      ]);
      setInput('');
    } else {
      console.error('WebSocket is not open or user ID is null');
    }
  };

  if (connectionStatus === 'connecting') {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
        <Text>Connecting to chat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {connectionStatus !== 'connected' && (
        <Text style={styles.disconnectedText}>
          Disconnected. Trying to reconnect...
        </Text>
      )}
      <FlatList
        data={messages.slice().reverse()} // Reverse the messages to show the latest at the bottom
        keyExtractor={(item, index) => index.toString()}
        inverted
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender_id === userId ? styles.myMessage : styles.theirMessage,
            ]}
          >
            <Text>{item.content}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Type a message..."
        />
        <Button
          title="Send"
          onPress={sendMessage}
          disabled={connectionStatus !== 'connected' || input.trim() === ''}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnectedText: {
    color: 'red',
    textAlign: 'center',
  },
  messageBubble: {
    borderRadius: 5,
    padding: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
});
