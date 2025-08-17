// src/hooks/useApiRequest.ts
import { useState, useCallback } from 'react';
import { ApiRequest, ApiResponse, RequestHeaders } from '../types/api';

interface UseApiRequestReturn {
  request: ApiRequest;
  response: string;
  loading: boolean;
  updateRequest: (updates: Partial<ApiRequest>) => void;
  sendRequest: () => Promise<void>;
  clearResponse: () => void;
}

export const useApiRequest = (): UseApiRequestReturn => {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: '',
    headers: {},
    body: '',
  });

  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateRequest = useCallback((updates: Partial<ApiRequest>) => {
    setRequest((prev) => ({ ...prev, ...updates }));
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

  const clearResponse = useCallback(() => {
    setResponse('');
  }, []);

  return {
    request,
    response,
    loading,
    updateRequest,
    sendRequest,
    clearResponse,
  };
};
