import { API_BASE } from './config';

export default class ApiGateway {
  async get(path) {
    const response = await fetch(`${API_BASE}${path}`);
    return await response.json();
  }

  async post(path, payload = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  }

  async put(path) {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }
}
