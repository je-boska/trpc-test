import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

export default function Home() {
  const utils = trpc.useContext();
  const posts = trpc.useQuery(['getPosts']);
  const createPost = trpc.useMutation(['createPost'], {
    async onSuccess() {
      await utils.invalidateQueries(['getPosts']);
    },
  });

  if (!posts.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const $title: HTMLInputElement = (e as any).target.elements.title;
          const input = {
            title: $title.value,
          };

          console.log(input);

          try {
            await createPost.mutateAsync(input);

            $title.value = '';
          } catch {}
        }}
      >
        <input id='title' name='title' placeholder='Title'></input>
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {posts.data.map(({ title, id }) => (
          <li key={id}>
            <h4>
              {id} {title}
            </h4>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
