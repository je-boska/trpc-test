import Layout from '../src/components/Layout';

export default function Home({ users }) {
  return (
    <Layout>
      <main>
        {users.map(({ first_name, last_name, email }, idx) => (
          <div key={idx}>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <p>{email}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/hello');
  const users = await response.json();
  return {
    props: { users },
  };
}
