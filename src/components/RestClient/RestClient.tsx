// src/components/RestClient/RestClient.tsx
import React, { useState, useCallback } from 'react';
import { HttpMethod, ApiRequest, ApiResponse, RequestHeaders } from '../../types/api';
import './rest-client.css';
import { Button, Input, Select, Textarea } from '../Common';

const RestClient: React.FC = () => {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: '',
    headers: {},
    body: '',
  });
  const [headersText, setHeadersText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const parseHeaders = useCallback((headersText: string): RequestHeaders => {
    const parsedHeaders: RequestHeaders = {};

    if (headersText.trim()) {
      headersText.split('\n').forEach((line) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          if (key && value) {
            parsedHeaders[key] = value;
          }
        }
      });
    }

    return parsedHeaders;
  }, []);

  const formatResponse = useCallback((apiResponse: ApiResponse, responseText: string): string => {
    let formattedResponse: string;

    try {
      const jsonData = JSON.parse(responseText);
      formattedResponse = JSON.stringify(jsonData, null, 2);
    } catch {
      formattedResponse = responseText;
    }

    return `Status: ${apiResponse.status} ${apiResponse.statusText}
Time: ${apiResponse.responseTime}ms
Date: ${apiResponse.timestamp.toISOString()}

Headers:
${Object.entries(apiResponse.headers)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Body:
${formattedResponse}`;
  }, []);

  const sendRequest = useCallback(async (): Promise<void> => {
    if (!request.url.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const startTime = Date.now();

      const fetchOptions: RequestInit = {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
      };

      if (request.method !== 'GET' && request.method !== 'HEAD' && request.body?.trim()) {
        fetchOptions.body = request.body;
      }

      const res = await fetch(request.url, fetchOptions);
      const responseText = await res.text();
      const endTime = Date.now();

      // Response 헤더 파싱
      const responseHeaders: RequestHeaders = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const apiResponse: ApiResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data: responseText,
        responseTime: endTime - startTime,
        timestamp: new Date(),
      };

      setResponse(formatResponse(apiResponse, responseText));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [request, formatResponse]);

  const updateRequest = useCallback((updates: Partial<ApiRequest>) => {
    setRequest((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateRequest({ method: e.target.value as HttpMethod });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRequest({ url: e.target.value });
  };

  const handleHeadersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const headersText = e.target.value;
    setHeadersText(headersText);
    const parsedHeaders = parseHeaders(headersText);
    updateRequest({ headers: parsedHeaders });
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateRequest({ body: e.target.value });
  };

  const canSend = !loading && request.url.trim();

  return (
    <div className="rest-client">
      <div className="request-section">
        <div className="request-line">
          <Select value={request.method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </Select>

          <Input placeholder="Enter request URL..." value={request.url} onChange={handleUrlChange} />

          <Button onClick={sendRequest} disabled={!canSend}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>

        <div className="request-body-section">
          <div className="input-group">
            <label htmlFor="headers-input">Headers (key: value, one per line)</label>
            <Textarea
              placeholder="Authorization: Bearer your-token&#10;Content-Type: application/json"
              value={headersText}
              onChange={handleHeadersChange}
              rows={4}
            />
          </div>

          {request.method !== 'GET' && request.method !== 'HEAD' && (
            <div className="input-group">
              <label htmlFor="body-input">Body</label>
              <Textarea
                placeholder="Enter request body (JSON, XML, etc.)"
                value={request.body || ''}
                onChange={handleBodyChange}
                rows={8}
              />
            </div>
          )}
        </div>
      </div>

      <div className="response-section">
        <h3>Response</h3>
        <div className="request-info">
          <small>
            {request.method} {request.url}
            {Object.keys(request.headers || {}).length > 0 && (
              <span> • {Object.keys(request.headers).length} headers</span>
            )}
          </small>
        </div>
        <pre className="response-output">{response || 'No response yet. Send a request to see the result.'}</pre>
      </div>
    </div>
  );
};

export default RestClient;
