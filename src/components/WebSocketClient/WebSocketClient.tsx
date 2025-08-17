// src/components/WebSocketClient/WebSocketClient.tsx
import React, { useState, useRef, useEffect } from 'react';
import { WebSocketMessage } from '@/types/common';
import { v4 as uuidv4 } from 'uuid';
import JsonViewer from '../JsonViewer';
import { Button, Input } from '../Common'; // 👈 공통 컴포넌트 활용
import './websocket-client.css';

const WebSocketClient: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    if (!url.trim()) return;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      addMessage('system', '✅ Connected to server');
    };
    ws.onmessage = (event) => addMessage('received', event.data);
    ws.onerror = () => addMessage('error', '❌ Error occurred');
    ws.onclose = () => {
      setIsConnected(false);
      addMessage('system', '🔌 Disconnected');
    };
  };

  const disconnect = () => {
    wsRef.current?.close();
    wsRef.current = null;
  };

  const sendMessage = () => {
    if (!inputMsg.trim() || !wsRef.current) return;
    wsRef.current.send(inputMsg);
    addMessage('sent', inputMsg);
    setInputMsg('');
  };

  const addMessage = (type: WebSocketMessage['type'], content: string) => {
    setMessages((prev) => [...prev, { id: uuidv4(), type, content, timestamp: new Date() }]);
  };

  useEffect(() => () => wsRef.current?.close(), []);

  return (
    <div className="websocket-client">
      <div className="ws-header">
        <Input
          type="text"
          placeholder="wss://echo.websocket.events"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {!isConnected ? (
          <Button variant="primary" onClick={connect}>
            Connect
          </Button>
        ) : (
          <Button variant="danger" onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </div>

      <div className="ws-messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className={`ws-message-meta ${msg.type}`}>
              [{msg.timestamp.toLocaleTimeString()}] {msg.type.toUpperCase()}
            </div>
            <JsonViewer content={msg.content} />
          </div>
        ))}
      </div>

      {isConnected && (
        <div className="ws-footer">
          <Input
            type="text"
            placeholder="Enter your message"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <Button variant="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebSocketClient;
