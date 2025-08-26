import { fetcher } from '@/fetcher';
import { Vips } from '@/constants/Main/index';
import proxyFetcher from '@/fetcher/proxyFetch';

export async function getVipList(
  query: any = { sort: 'rate,DESC' }
): Promise<Vips> {
  const fetchRes: any = await fetcher(`/congressman`, {
    method: 'GET',
    query
  });
  if (!fetchRes.congressmanList) {
    throw new Error('Invalid data structure');
  }

  return fetchRes as Vips;
}

export async function getVipList2(
  query: any = { sort: 'rate,DESC' }
): Promise<Vips> {
  const fetchRes: any = await fetcher(`/api/proxy/congressman`, {
    method: 'GET',
    query
  });
  if (!fetchRes.congressmanList) {
    throw new Error('Invalid data structure');
  }

  return fetchRes as Vips;
}

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
  const fetchRes: any = await fetcher(`/api/ratings`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

// 의원 뉴스 가져오기
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

// 국회의원 발의안 가져오기
export async function getBill(name: string) {
  const fetchRes: any = await fetcher(`/api/proxy/bill`, {
    method: 'GET',
    query: {
      Key: '7ef51855a2c64b1baf05e82f43905c4f',
      Type: 'json',
      pIndex: '1',
      pSize: '3',
      PROPOSER: name,
      AGE: '22'
    }
  });
  return fetchRes;
}

// 국회의원 발의안 가져오기
export async function getSummarize(body: any) {
  const fetchRes: any = await fetcher(`/api/proxy/bill`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

// 국회의원 발의안 가져오기
export async function getGptSummary(body: any) {
  const fetchRes: any = await fetcher(`/api/proxy/gpt`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return fetchRes;
}

export async function postHandleReaction(id: any, options: any) {
  const fetchRes: any = await fetcher(`/likes/rating/${id}`, {
    ...options,
    method: 'POST'
  });
  return fetchRes;
}

export async function deleteHandleReaction(id: any, options: any) {
  const fetchRes: any = await fetcher(`/likes/rating/${id}`, {
    ...options,
    method: 'DELETE'
  });
  return fetchRes;
}

export async function posDislike(id: any, options: any) {
  const fetchRes: any = await fetcher(`/dislikes/rating/${id}`, {
    ...options,
    method: 'POST'
  });
  return fetchRes;
}

export async function deleteDislike(id: any, options: any) {
  const fetchRes: any = await fetcher(`/dislikes/rating/${id}`, {
    ...options,
    method: 'DELETE'
  });
  return fetchRes;
}

export async function getBills(id: string, query: any) {
  const fetchRes: any = await fetcher(`/bill/${id}`, {
    method: 'GET',
    query
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
