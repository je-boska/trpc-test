import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '../server/routers/app';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = 'http://localhost:3000/api/trpc';

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: true,
})(MyApp);
