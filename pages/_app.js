import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContainer autoClose={3000} />
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
 useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  return <div>Loading...</div>;
}
