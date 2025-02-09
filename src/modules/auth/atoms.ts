import { fetcher } from '@/fetcher';
import { atom } from 'jotai';

// atom
export const accessTokenAtom = atom('');

export async function getTokenAtom(query = {}) {
  const fetchRes: any = await fetcher(`/test/accessToken/1`, {
    method: 'GET',
    query
  });
  return fetchRes;
}
