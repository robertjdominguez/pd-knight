import Link from "next/link";
import { useSession, signin, signout } from "next-auth/client";
import { NavBar, NavCTA, NavItems } from "./Lib";

export default function Nav() {
  const [session, loading] = useSession();

  session && console.log(session);

  return (
    <NavBar>
      <img
        src="Brand Logo.png"
        width="300px"
        height="auto"
        alt="The Altamont School Logo"
        style={{ gridArea: `logo` }}
      />
      <NavItems>
        <Link href="/">Home</Link>
        <Link href="/sessions">Sessions</Link>
        <Link href="/blog">Blog</Link>
        <></>
        {session && <Link href="/protected/dashboard">My Dashboard</Link>}
        {!session ? (
          <NavCTA onClick={signin}>Sign in</NavCTA>
        ) : (
          <NavCTA onClick={signout}>Sign out</NavCTA>
        )}
      </NavItems>
    </NavBar>
  );
}
