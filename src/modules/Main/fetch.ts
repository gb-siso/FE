import { fetcher } from '@/fetcher';
import { Vips } from '@/constants/Main/index';

export async function getVipList(query = { sort: 'rate,ASC' }): Promise<Vips> {
  const fetchRes: any = await fetcher(`/congressman`, {
    method: 'GET',
    query
  });

  // fetchRes가 Vips 타입과 일치하는지 검사하고 반환
  if (!fetchRes.congressmanList || !fetchRes.lastPage) {
    throw new Error('Invalid data structure');
  }

  return fetchRes as Vips;
}
