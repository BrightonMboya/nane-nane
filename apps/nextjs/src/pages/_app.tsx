import "../styles/globals.css";
import type { AppType } from "next/app";
import { api } from "~/utils/api";

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
 
      <Component {...pageProps} />
    
  );
};
export default api.withTRPC(MyApp);
