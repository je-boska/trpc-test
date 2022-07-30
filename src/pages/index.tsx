import Layout from '../components/Layout';
import { trpc } from '../utils/trpc';

export default function Home() {
  const utils = trpc.useContext();
  const posts = trpc.useQuery(['posts.all']);
  const createPost = trpc.useMutation(['posts.add'], {
    async onSuccess() {
      await utils.invalidateQueries(['posts.all']);
    },
  });
  const deletePost = trpc.useMutation(['posts.delete'], {
    async onSuccess() {
      await utils.invalidateQueries(['posts.all']);
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
          try {
            await createPost.mutateAsync(input);
            $title.value = '';
          } catch {}
        }}
      >
        <input id='title' name='title' placeholder='Title'></input>
        <button type='submit' disabled={createPost.isLoading}>
          Submit
        </button>
      </form>
      <ul>
        {posts.data.map(({ title, id }) => (
          <li key={id}>
            <h4>
              {id} {title}
            </h4>
            <button
              disabled={deletePost.isLoading}
              onClick={async (e) => {
                e.preventDefault();
                deletePost.mutateAsync({ id });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
