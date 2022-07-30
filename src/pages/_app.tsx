import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { AppRouter } from './api/trpc/[trpc]';

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
  responseMeta({ clientErrors, ctx }) {
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
})(MyApp);
