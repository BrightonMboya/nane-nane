import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider {...pageProps}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ClerkProvider>
     );
};
export default api.withTRPC(MyApp);
