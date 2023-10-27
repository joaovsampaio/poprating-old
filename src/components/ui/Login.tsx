import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("google")}>Login</button>
    </>
  );
}

export default Login;
