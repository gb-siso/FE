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

export interface VipRatings {
  countCursor: number | null;
  ratingList: Rating[];
}

interface Rating {
  id: string;
  member: Member;
  content: string;
  rate: number | null;
  likeCount: number | null;
  dislikeCount: number | null;
  topicality: number | null;
  createdAt: string;
}

interface Member {
  id: string;
  imageUrl: string;
  nickname: string;
}

// 평가 작성 타입
export interface PostRatingType {
  rating: number;
  content: string;
}
