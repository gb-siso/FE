import { fetcher } from '@/fetcher';
import { Vips } from '@/constants/Main/index';
import proxyFetcher from '@/fetcher/proxyFetch';

export async function getVipList(
  query: any = { sort: 'rate,ASC' }
): Promise<Vips> {
  const fetchRes: any = await fetcher(`/congressman`, {
    method: 'GET',
    query
  });

  if (!fetchRes.congressmanList || !fetchRes.lastPage) {
    throw new Error('Invalid data structure');
  }

  return fetchRes as Vips;
}

// /ratings/MDzkc8UlJI2omb0GwO40Uw
export async function getVipRatings(params: string) {
  const fetchRes: any = await fetcher(`/ratings/${params}`, {
    method: 'GET'
  });
  return fetchRes;
}

export async function postVipRating(body: any, options: any) {
  const fetchRes: any = await fetcher(`/ratings`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

export async function postVipRating2(body: any, options: any) {
  const fetchRes: any = await proxyFetcher(`/api/ratings`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

// 뉴스 가져오기
// export async function getVipNews(name: string) {
//   const fetchRes: any = await fetcher(
//     `https://open.assembly.go.kr/portal/openapi/nauvppbxargkmyovh`,
//     {
//       method: 'GET',
//       query: {
//         Key: 'a7472423eb5c49d58f8c7eeae292b0db',
//         Type: 'json',
//         pIndex: '1',
//         pSize: '12',
//         COMP_MAIN_TITLE: name
//       }
//     }
//   );
//   return fetchRes;
// }

export async function getVipNews(name: string) {
  const fetchRes: any = await fetcher(`/api/proxy`, {
    method: 'GET',
    query: {
      Key: 'a7472423eb5c49d58f8c7eeae292b0db',
      Type: 'json',
      pIndex: '1',
      pSize: '12',
      COMP_MAIN_TITLE: name
    }
  });
  return fetchRes;
}
