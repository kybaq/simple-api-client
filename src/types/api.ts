// src/types/api.ts
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface RequestHeaders {
  [key: string]: string;
}

export interface ApiRequest {
  method: HttpMethod;
  url: string;
  headers: RequestHeaders;
  body?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: RequestHeaders;
  data: string;
  responseTime: number;
  timestamp: Date;
}

export interface RequestHistory {
  id: string;
  request: ApiRequest;
  response?: ApiResponse;
  error?: string;
}
