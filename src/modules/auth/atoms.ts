import { atom } from 'jotai';
import * as Fetch from './fetch';

// atom
export const accessTokenAtom = atom('');

export const getTokenAtom = atom(null, async (get, set, { query = {} }) => {
  try {
    const response = await Fetch.getToken(query);

    set(accessTokenAtom, response);
    return response;
  } catch (err) {
    throw err;
  }
});
