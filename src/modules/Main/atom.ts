import { atom } from 'jotai';

import * as Fetch from './fetch';

import { Vips, VipRatings } from '@/constants/Main/index';
import { accessTokenAtom } from '../auth/atoms';

export const vipsAtom = atom<Vips>({
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
export const billAtom = atom({ row: [] });

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

export const getBillAtom = atom(null, async (get, set, { name }) => {
  try {
    const response = await Fetch.getBill(name);
    if (response.row.length) {
      const { row } = response;
      const filterRow = row.map((item: any) => ({
        createDate: item.PROPOSE_DT,
        link: item.DETAIL_LINK
      }));

      const body = await Fetch.getSummarize({ body: filterRow });
      const { data } = await Fetch.getGptSummary(body);
      const bills = data.split('##');

      const result: any = [];
      bills.map((item: string, key: number) => {
        if (!item) return;
        if (filterRow[key - 1]) {
          const lines = item.split('\n')[1];
          const category = lines.split('**카테고리**: ')[1];

          const filter = filterRow[key - 1];
          filter['category'] = category;
          filter['bill'] = item;
          result.push(filter);
        }
      });
      set(billAtom, { row: result });
    }
    return response;
  } catch (err) {
    throw err;
  }
});

// 의원 리스트 가져오기
export const getVipListAtom = atom(null, async (get, set, { query }) => {
  try {
    const response = await Fetch.getVipList(query);
    set(vipsAtom, response);
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

// 좋아요, 싫어요 버튼 핸들러
export const postHandleReactionAtom = atom(null, async (get, set, { id }) => {
  try {
    const accessToken = get(accessTokenAtom);

    const response = await Fetch.postHandleReaction(id, {
      accessToken
    });
    return response;
  } catch (err) {
    throw err;
  }
});
