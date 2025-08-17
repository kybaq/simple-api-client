// src/types/common.ts
export type TabType = "rest" | "websocket";

export interface WebSocketMessage {
  id: string;
  type: "sent" | "received" | "system" | "error";
  content: string;
  timestamp: Date;
}

export interface WebSocketConnection {
  url: string;
  isConnected: boolean;
  messages: WebSocketMessage[];
}
