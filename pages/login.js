import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();

  const router = useRouter();

  async function login() {
    const nome = session.user?.name;
    const email = session.user?.email;

    const usuarioExiste = (await axios.get("/api/auth/buscarUser"), email);

    if (usuarioExiste === null) {
      await axios
        .post("/api/auth/registrar", { nome, email })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
      return;
    }
  }

  useEffect(() => {
    if (session) {
      login();
      router.push("/");
    }
  }, [session]);

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden '>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-slate-700 underline'>
          Login
        </h1>

        <div className='mt-6'>
          <button
            onClick={() => signIn()}
            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600'
          >
            Entrar com google
          </button>
        </div>
      </div>
    </div>
  );
}
