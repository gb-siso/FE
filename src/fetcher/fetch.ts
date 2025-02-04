interface FetchOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'; // method는 반드시 필요
  body?: any; // body는 POST, PATCH, DELETE에만 사용
  query?: Record<string, string>; // query는 GET에만 사용
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions
): Promise<T | null> {
  try {
    let finalUrl = url;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = `${process.env.BASE_URL}${url}`;
    }

    if (options.query) {
      const queryString = new URLSearchParams(options.query).toString();
      finalUrl = finalUrl.includes('?')
        ? `${finalUrl}&${queryString}`
        : `${finalUrl}?${queryString}`;
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // POST, PATCH, DELETE 요청에서 body 처리
    if (
      (options.method === 'POST' ||
        options.method === 'PATCH' ||
        options.method === 'DELETE') &&
      options.body
    ) {
      fetchOptions.body = JSON.stringify(options.body);
    }
    // fetch 호출
    const response = await fetch(finalUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // 에러 발생 시 null 반환
  }
}
