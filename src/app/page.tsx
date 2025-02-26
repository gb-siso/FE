import MainPage from '@/modules/Main';
import { getVipList } from '@/modules/Main/fetch';

export default async function Home() {
  const vipList = await getVipList();

  return (
    <div>
      <MainPage initialVipList={vipList} />
    </div>
  );
}
