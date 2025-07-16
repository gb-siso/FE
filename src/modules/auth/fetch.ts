import { fetcher } from '@/fetcher';

export async function getToken(query = {}) {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchRes: any = await fetcher(`/test/accessToken/3`, {
    method: 'GET',
    query
  });
  return fetchRes;
}

export async function getReissueToken(body: any, options: any) {
  const fetchRes: any = await fetcher(`/auth/reissue`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

export async function login(code: string, state: string) {
  const fetchRes: any = await fetcher(
    `/auth/login/naver?code=${code}&state=${state}`,
    {
      method: 'GET'
    }
  );
  return fetchRes;
}
