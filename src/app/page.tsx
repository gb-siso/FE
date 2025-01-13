import HomeView from './_components/HomeView';

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store'
  });

  const data = await res.json();
  return (
    <div>
      <HomeView />
    </div>
  );
}
