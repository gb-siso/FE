import styled from 'styled-components';
import VipDetail from '@/modules/Main/VipDetail';
import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getVipList, getVipNews, getVipRatings } from '@/modules/Main/fetch';
import { getToken } from '@/modules/auth/fetch';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { getBills } from '@/modules/Main/fetch';

export default async function DetailPage({
  params
}: {
  params: Promise<{ vipId: string }>;
}) {
  const vipId = (await params).vipId;
  const search = decodeURIComponent(vipId);

  if (vipId === 'favicon.ico') {
    return;
  }

  const vipDetail = await getVipList({ search });

  const id = vipDetail?.congressmanList[0]?.id;
  const ratings = await getVipRatings(id);

  return (
    <>
      <VipDetail initialData={{ ratings, vipDetail }} />
    </>
  );
}
