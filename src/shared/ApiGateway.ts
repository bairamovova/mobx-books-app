import { API_BASE } from './config';

type ApiResponse<T = unknown> = T | { status: string };

class ApiGateway {
  private async request<T>(
    path: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${path}`, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return data as ApiResponse<T>;
    } catch (error) {
      console.error('API Request Error:', error);
      throw new Error(`API error: ${(error as Error).message}`);
    }
  }

  async get<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'GET' });
  }

  async post<T>(path: string, payload: object = {}): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  async put<T>(path: string, payload: object = {}): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}

export default ApiGateway;
