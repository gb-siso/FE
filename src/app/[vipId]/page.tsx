import styled from 'styled-components';
import VipDetail from '@/modules/Main/VipDetail';
import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getVipList, getVipNews, getVipRatings } from '@/modules/Main/fetch';
import { getToken } from '@/modules/auth/fetch';

export default async function DetailPage({
  params
}: {
  params: Promise<{ vipId: string }>;
}) {
  const vipId = (await params).vipId;

  if (vipId === 'favicon.ico') {
    return;
  }
  const search = decodeURIComponent(vipId);
  const vipDetail = await getVipList({ search });

  const id = vipDetail?.congressmanList[0]?.id;

  const ratings = await getVipRatings(id);
  let vipNews;
  try {
    vipNews = await getVipNews(search);
  } catch (error) {}
  const news = vipNews?.nauvppbxargkmyovh ? vipNews?.nauvppbxargkmyovh[1] : {};

  const accessToken = await getToken();

  return (
    <>
      <VipDetail initialData={{ ratings, vipDetail, accessToken, news }} />{' '}
    </>
  );
}
