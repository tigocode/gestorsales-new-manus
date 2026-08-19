import { User } from 'firebase/auth';

const baseUrl = (process.env.EXPO_PUBLIC_WAT_API_URL || 'http://localhost:3002').replace(/\/$/, '');

type ApiOptions = RequestInit & { user?: User | null };

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (options.user) headers.set('Authorization', `Bearer ${await options.user.getIdToken()}`);
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Erro HTTP ${response.status}`);
  return payload as T;
}

export type InstanceRecord = {
  instance: string;
  status: string;
  phone?: string | null;
  qrcode?: string | null;
  qr_expires_at?: string | null;
};

export async function startSession(company: string, name: string, user?: User | null) {
  return request<{ message: string; instance: string; Qrcode: string }>('/start-session', {
    method: 'POST',
    body: JSON.stringify({ company, name }),
    user,
  });
}

export async function getInstance(instance: string, user?: User | null) {
  const result = await request<{ response: InstanceRecord }>('/getinstance', {
    method: 'POST',
    body: JSON.stringify({ instance }),
    user,
  });
  return result.response;
}

export async function logoutSession(instance: string, user?: User | null) {
  return request<{ message: string }>('/logout-session', {
    method: 'POST',
    body: JSON.stringify({ instance }),
    user,
  });
}
