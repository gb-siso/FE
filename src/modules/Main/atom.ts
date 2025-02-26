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
export const vipNewsAtom = atom({ row: [] });
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

// export const writeRatingAtom = atom(null, async (get, set, { body }) => {
//   try {
//     const accessToken = get(accessTokenAtom);

//     const response = await Fetch.postVipRating2(body, {
//       accessToken
//     });
//     return response;
//   } catch (err) {
//     throw err;
//   }
// });

export const getVipNewsAtom = atom(null, async (get, set, { name }) => {
  try {
    const response = await Fetch.getVipNews(name);
    set(vipNewsAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});
