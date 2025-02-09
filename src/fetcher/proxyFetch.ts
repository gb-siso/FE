// types/networkError.ts
export class NetworkError extends Error {
  public code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'NetworkError';
    this.code = code;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

// utils/fetcher.ts
interface FetchOptions {
  method: string;
  body?: any;
  accessToken?: string;
  [key: string]: any; // 다른 옵션들을 허용하기 위한 인덱스 시그니처
}

const proxyFetcher = async (url: string, options: FetchOptions) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (options.accessToken) {
    headers['Authorization'] = `Bearer ${options.accessToken}`;
  }

  const response = await fetch(url, {
    method: options.method,
    headers: headers,
    body: options.body ? JSON.stringify(options.body) : null
  });

  if (!response.ok) {
    const errorBody = await response.json();
    const errorCode = errorBody?.errors?.[0]?.code || 'E5000000';
    const errorMessage = errorBody?.errors?.[0]?.message || response.statusText;
    throw new NetworkError(errorMessage, errorCode);
  }

  const data = await response.json();

  if (data?.errors && Array.isArray(data.errors)) {
    throw new NetworkError(data.errors[0].message, data.errors[0].code);
  }

  return data;
};

export default proxyFetcher;
