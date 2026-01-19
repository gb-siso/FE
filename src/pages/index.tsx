// pages/index.tsx
import Main from '@/modules/Main';
import { GetServerSideProps } from 'next';
import { getVipList } from '@/modules/Main/fetch';
import { Vips } from '@/constants/Main/index';

interface HomeProps {
  data: Vips;
  party?: string;
}

export default function Home({ data, party }: HomeProps) {
  return <Main data={data} party={party} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { party } = context.query;

    const query: any = { sort: 'rate,DESC' };

    if (party && typeof party === 'string') {
      query.party = party;
    }

    const data = await getVipList(query);

    return {
      props: {
        data,
        party: party || null
      }
    };
  } catch (error) {
    // 에러 발생 시 기본값 반환
    return {
      props: {
        data: {
          congressmanList: [],
          idCursor: null,
          rateCursor: null,
          lastPage: false
        },
        party: null
      }
    };
  }
};
