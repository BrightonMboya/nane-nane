import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "~/utils/api";
import RootLayout from "~/components/Layout";

// const MyApp: AppType<{ session: Session | null }> = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }) => {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// };
const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};
export default api.withTRPC(MyApp);
