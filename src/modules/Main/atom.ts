import { atom } from 'jotai';

import * as Fetch from './fetch';

import { Vips } from '@/constants/Main/index';

export const vipsAtom = atom<Vips>({
  congressmanList: [],
  idCursor: null,
  rateCursor: null,
  lastPage: false
});
export const categoryDetailAtom = atom({ _id: '', name: '', url: '' });

export const atomMapKey = {
  Main: {
    vipsAtom: 'category__categoriesAtom',
    categoryDetailAtom: 'category__categoryDetailAtom'
  }
};

export const atomMap = {
  [atomMapKey.Main.vipsAtom]: vipsAtom,
  [atomMapKey.Main.categoryDetailAtom]: categoryDetailAtom
};
