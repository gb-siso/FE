import { atom } from 'jotai';
import * as Fetch from './fetch';

// atom
export const accessTokenAtom = atom('');

export const userMeAtom = atom({
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
  async (get, set, { query = {} }) => {
    try {
      const response = await Fetch.getReissueToken(query);
      set(accessTokenAtom, response);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const loginAtom = atom(null, async (get, set, { code, state }) => {
  try {
    const response = await Fetch.login(code, state);
    localStorage.setItem('cookieData', response?.accessToken);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        nickname: response?.nickname,
        imageUrl: response?.imageUrl
      })
    );

    set(accessTokenAtom, response?.accessToken);
    set(userMeAtom, {
      nickname: response?.nickname,
      imageUrl: response?.imageUrl
    });

    return response;
  } catch (err) {
    throw err;
  }
});

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
