import { atom } from 'jotai';

import * as Fetch from './fetch';

import { Vips, VipRatings } from '@/constants/Main/index';
import { accessTokenAtom } from '../auth/atoms';

export const partyAtom = atom('');
// 의원 리스트
export const vipsAtom = atom<Vips>({
  congressmanList: [],
  idCursor: null,
  rateCursor: null,
  lastPage: false
});

// 검색 의원 리스트
export const searchVipsAtom = atom<Vips>({
  congressmanList: [],
  idCursor: null,
  rateCursor: null,
  lastPage: false
});

export const vipDataAtom = atom<Vips>({
  congressmanList: [],
  idCursor: '',
  rateCursor: '',
  lastPage: true
});

export const categoryDetailAtom = atom({ _id: '', name: '', url: '' });
export const vipNewsAtom = atom({ row: [] });
export const billAtom = atom({ billList: [], lastPage: 0 });

export const vipRatings = atom<VipRatings>({
  countCursor: null,
  ratingList: [
    {
      id: '',
      member: {
        id: '',
        imageUrl: '',
        nickname: ''
      },
      content: '',
      rate: null,
      likeCount: null,
      dislikeCount: null,
      topicality: null,
      createdAt: ''
    }
  ]
});

export const writeRatingAtom = atom(null, async (get, set, { body }) => {
  try {
    const accessToken = get(accessTokenAtom);

    const response = await Fetch.postVipRating(body, {
      accessToken
    });
    return response;
  } catch (err) {
    throw err;
  }
});

// 뉴스 가져오기
export const getVipNewsAtom = atom(null, async (get, set, { name }) => {
  try {
    const response = await Fetch.getVipNews(name);
    set(vipNewsAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});

// 의원 리스트 가져오기
export const getVipListAtom = atom(
  null,
  async (get, set, { query, merge = true }) => {
    try {
      // 요기
      // const response = await Fetch.getVipList(query);
      const response = await Fetch.getVipList2(query);

      const newState = {
        ...response,
        congressmanList: merge
          ? [
              ...(get(vipsAtom)?.congressmanList ?? []),
              ...response.congressmanList.slice(1)
            ]
          : response.congressmanList
      };

      set(vipsAtom, {
        ...response,
        congressmanList: Array.isArray(newState.congressmanList)
          ? newState.congressmanList
          : []
      });

      return newState;
    } catch (err) {
      throw err;
    }
  }
);

// 의원 검색하기
export const getSearchVipListAtom = atom(null, async (get, set, { query }) => {
  try {
    const response = await Fetch.getVipList(query);
    set(searchVipsAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});

// 평가 가져오기
export const getVipRatingsAtom = atom(null, async (get, set, { params }) => {
  try {
    const response = await Fetch.getVipRatings(params);
    set(vipRatings, response);
    return response;
  } catch (err) {
    throw err;
  }
});

// 좋아요, 핸들러
export const postHandleReactionAtom = atom(null, async (get, set, { id }) => {
  try {
    const accessToken = get(accessTokenAtom);

    const response = await Fetch.postHandleReaction(id, {
      accessToken
    });
    return response;
  } catch (err: any) {
    const accessToken = get(accessTokenAtom);
    const code = err.body.code.slice(-3);

    if (code === '001') {
      const response = await Fetch.deleteHandleReaction(id, {
        accessToken
      });
      return response;
    }

    throw err;
  }
});

// 좋아요, 핸들러
export const postDislikeAtom = atom(null, async (get, set, { id }) => {
  try {
    const accessToken = get(accessTokenAtom);
    const response = await Fetch.posDislike(id, {
      accessToken
    });
    return response;
  } catch (err: any) {
    const accessToken = get(accessTokenAtom);
    const code = err.body.code.slice(-3);

    if (code === '001') {
      const response = await Fetch.deleteDislike(id, {
        accessToken
      });
      return response;
    }
    throw err;
  }
});

// 좋아요, 핸들러
export const getBillsAtom = atom(null, async (get, set, { id, query }) => {
  try {
    const response = await Fetch.getBills(id, query);
    const bill = get(billAtom);

    if (bill.billList.length && response.page !== 0) {
      const combinedList = [...bill.billList, ...response.billList];
      response.billList = combinedList;
    }

    set(billAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});

export const updatePartyAtom = atom(null, async (get, set, party: string) => {
  set(partyAtom, party);
});

export const postFavoritesAtom = atom(null, async (get, set, id: string) => {
  const response = await Fetch.postFavorites(id);
  return response;
});
