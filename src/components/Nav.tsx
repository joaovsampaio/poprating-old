import Link from "next/link";
import Login from "./ui/Login";
import { Montserrat } from "next/font/google";

const montserrat_600 = Montserrat({ subsets: ["latin"], weight: "600" });

function Nav() {
  return (
    <nav
      style={montserrat_600.style}
      className="flex items-center justify-between max-lg:flex-col text-purple-900"
    >
      <Link href="/form/post-article">Postar</Link>
      <Login />
      <Link href="/posts/reviews">Críticas</Link>
    </nav>
  );
}

export default Nav;
