import { fetcher } from '@/fetcher';

export async function getToken(query = {}) {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // 경숙이 누님 응원합니다^^
  const fetchRes: any = await fetcher(`/test/accessToken/2`, {
    method: 'GET',
    query
  });
  return fetchRes;
}
