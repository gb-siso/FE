import { fetcher } from '@/fetcher';

export async function getToken(query = {}) {
  const fetchRes: any = await fetcher(`/test/accessToken/1`, {
    method: 'GET',
    query
  });
  return fetchRes;
}
