export interface Vip {
  id: string;
  name: string;
  party: string;
  timesElected: number;
  rate: number;
  ratedMemberImages: string[];
}

export interface Vips {
  congressmanList: Vip[] | [];
  idCursor: string | null;
  rateCursor: string | null;
  lastPage: boolean;
}
