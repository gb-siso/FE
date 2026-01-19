import VipDetail from '@/modules/Main/VipDetail';
import { getVipList, getVipRatings } from '@/modules/Main/fetch';
import { GetServerSideProps } from 'next';

interface DetailPageProps {
  vipDetail: any;
  ratings: any;
}

export default function DetailPage({ vipDetail, ratings }: DetailPageProps) {
  if (!vipDetail) {
    return null;
  }

  return (
    <>
      <VipDetail initialData={{ ratings, vipDetail }} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { vipId } = context.params!;

  if (vipId === 'favicon.ico') {
    return {
      notFound: true
    };
  }

  const search = decodeURIComponent(vipId as string);
  const vipDetail = await getVipList({ search });

  if (!vipDetail || !vipDetail.congressmanList || vipDetail.congressmanList.length === 0) {
    return {
      notFound: true
    };
  }

  const id = vipDetail.congressmanList[0]?.id;
  const ratings = await getVipRatings(id);

  return {
    props: {
      vipDetail,
      ratings
    }
  };
};
