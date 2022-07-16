import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

export default function Home() {
  const users = trpc.useQuery(['getUsers']);

  if (!users.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <ul>
        {users.data.map(({ first_name, last_name, email, location }, idx) => (
          <li key={idx}>
            <h4>
              {first_name} {last_name}
            </h4>
            <p>{location.city}</p>
            <p>{email}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
