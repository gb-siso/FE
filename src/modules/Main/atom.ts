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

export const categoryDetailAtom = atom({ _id: '', name: '', url: '' });

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
      topicality: null
    }
  ]
});

export const writeRatingAtom = atom(null, async (get, set, { body }) => {
  try {
    const accessToken = get(accessTokenAtom);

    const response = await Fetch.postVipRating2(body, {
      accessToken
    });
    return response;
  } catch (err) {
    throw err;
  }
});
