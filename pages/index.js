import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function Index() {
  const { data, error } = useSWR('/api/staticdata', fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading</div>;

  return (
    <div>
      <header>
        <h1>Progenerator</h1>
        <p>Generate your next project idea now</p>
      </header>
      <main>
        <button>Generate</button>
      </main>
      <footer>
        <p>All rights reserved GCWebDev 2022</p>
      </footer>
    </div>
  )
};