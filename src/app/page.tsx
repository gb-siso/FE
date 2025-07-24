// import MainPage from '@/modules/Main';

// app/page.tsx
import dynamic from 'next/dynamic';

// Main을 클라이언트에서만 렌더링하도록 설정
const Main = dynamic(() => import('@/modules/Main'), { ssr: false });

export default async function Home() {
  return (
    <div>
      <Main />
    </div>
  );
}
