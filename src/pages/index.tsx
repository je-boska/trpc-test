import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

export default function Home() {
  const posts = trpc.useQuery(['getPosts']);

  if (!posts.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <ul>
        {posts.data.map(({ title }, idx) => (
          <li key={idx}>
            <h4>{title}</h4>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
