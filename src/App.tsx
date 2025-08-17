// src/App.tsx
import React, { useState } from 'react';
import RestClient from './components/RestClient/RestClient';
import WebSocketClient from './components/WebSocketClient/WebSocketClient';
import { TabType } from './types/common';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('rest');

  return (
    <div className="app">
      <header className="app-header">
        <h1>API Client</h1>
        <div className="tab-navigation">
          <button className={activeTab === 'rest' ? 'active' : ''} onClick={() => setActiveTab('rest')}>
            REST API
          </button>
          <button className={activeTab === 'websocket' ? 'active' : ''} onClick={() => setActiveTab('websocket')}>
            WebSocket
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'rest' && <RestClient />}
        {activeTab === 'websocket' && <WebSocketClient />}
      </main>
    </div>
  );
};

export default App;
