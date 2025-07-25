import getConfig from 'next/config';

const config = getConfig() || {};

const baseUrl = 'https://sisso-api.shop/api/v1';
// const baseUrl = 'https://www.sisso-api.shop/api/v1';
// const baseUrl = 'http://34.64.182.4:8080/api/v1';

// config.publicRuntimeConfig?.BASE_URL ||
//   process.env.NEXT_PUBLIC_BASE_URL ||
//   'https://www.sisso-api.shop/api/v1';
//   'http://34.64.182.4:8080/api/v1';

interface FetchOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'; // method는 반드시 필요
  body?: any; // body는 POST, PATCH, DELETE에만 사용
  query?: Record<string, string>; // query는 GET에만 사용
  accessToken?: string;
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions
): Promise<T | null> {
  try {
    let finalUrl = url.startsWith('/')
      ? `${baseUrl}${url}`
      : `${baseUrl}/${url}`;

    // 프록시 서버 이용시
    if (url.startsWith('/api')) {
      let realUrl = '';
      if (options.query) {
        const queryString = Object.entries(options.query)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        realUrl = `${url}?${queryString}`;
      }
      const fetchOptions: any = {
        method: options.method
      };

      if (
        (options.method === 'POST' ||
          options.method === 'PATCH' ||
          options.method === 'DELETE') &&
        options.body
      ) {
        fetchOptions.body = JSON.stringify(options.body);
        const response = await fetch(url, fetchOptions);
        const data: T = await response.json();
        return data;
      }

      const response = await fetch(realUrl);
      const data: T = await response.json();
      return data;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = `${baseUrl}${url}`;
    }

    if (url.startsWith('https://')) {
      finalUrl = `${url}`;
    }

    if (options.query) {
      const queryString = Object.entries(options.query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      finalUrl = finalUrl.includes('?')
        ? `${finalUrl}&${queryString}`
        : `${finalUrl}?${queryString}`;
    }

    const fetchOptions: any = {
      method: options.method,
      headers: {
        timeoutMs: 3000,
        delayMs: 150,
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        Expires: '-1'
      },
      cache: 'no-store',
      credentials: 'include'
    };

    const accessToken = options?.accessToken;
    if (accessToken) {
      fetchOptions.headers['accessToken'] = `${accessToken}`;
    }

    // POST, PATCH, DELETE 요청에서 body 처리
    if (
      (options.method === 'POST' ||
        options.method === 'PATCH' ||
        options.method === 'DELETE') &&
      options.body
    ) {
      fetchOptions.body = options.body;
    }

    const response = await fetch(finalUrl, fetchOptions);
    const contentType = response?.headers?.get('Content-Type');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (contentType && contentType.includes('text/plain;charset=UTF-8')) {
      const jwtToken: any = await response.text();

      return jwtToken;
    }
    const data: T = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
