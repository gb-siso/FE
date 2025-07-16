import { atom } from 'jotai';
import * as Fetch from './fetch';

import { atomWithStorage } from 'jotai/utils';

// 로컬 스토리지에 accessToken 저장
// 로컬 스토리지에 사용자 정보 저장

// atom
export const accessTokenAtom = atomWithStorage<string>('accessToken', '');

export const userMeAtom = atomWithStorage<{
  nickname: string;
  imageUrl: string;
}>('userInfo', {
  nickname: '',
  imageUrl: ''
});

export const getTokenAtom = atom(null, async (get, set, { query = {} }) => {
  try {
    const response = await Fetch.getToken(query);

    set(accessTokenAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});
export const getReissueTokenAtom = atom(
  null,
  async (get, set, { body = {} }) => {
    try {
      const accessToken = get(accessTokenAtom);
      const response = await Fetch.getReissueToken(body, {
        accessToken
      });
      set(accessTokenAtom, response);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const loginAtom = atom(
  null,
  async (get, set, { code, state }: { code: string; state: string }) => {
    try {
      const response = await Fetch.login(code, state);

      set(accessTokenAtom, response?.accessToken ?? null);
      set(userMeAtom, {
        nickname: response?.nickname ?? '',
        imageUrl: response?.imageUrl ?? ''
      });

      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const logoutAtom = atom(null, async (get, set) => {
  try {
    localStorage.setItem('cookieData', 'null');
    localStorage.setItem('userData', 'null');
    set(accessTokenAtom, '');
    set(userMeAtom, {
      nickname: '',
      imageUrl: ''
    });
  } catch (err) {
    throw err;
  }
});

// const decodedIdToken = decodeToken(idToken);
//     const decodedAccessToken = decodeToken(accessToken);
//     const stringifiedIdToken = JSON.stringify(decodedIdToken);

//     const setter = new CookieSetter();
//     setter.set(Constant.USER_ACCESS_TOKEN, accessToken, {
//       maxAge: expiresIn,
//     });

//     setter.set(Constant.USER_STRINGIFIED_PROFILE, stringifiedIdToken, {
//       maxAge: expiresIn,
//     });

// {
//   "nickname": "깨끗한 검은색 돌쥐",
//   "imageUrl": "default_image.jpg",
//   "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiTUVNQkVSIiwiaXNzIjoic2lzbyIsImlkIjoyLCJleHAiOjE3NTI1ODgxNDUsImlhdCI6MTc1MjU4NjM0NX0.rzzl7pr9ZtUdTf7OviYVF_yD3CvloVIpYvPev0Cn2ji_-EK2Ct9FMfj57BIU96RZeeB6B7yIzWdbw9pgExDFkQ"
// }
