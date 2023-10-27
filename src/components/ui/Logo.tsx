import { Righteous } from "next/font/google";
import Link from "next/link";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

function Logo() {
  return (
    <Link href="/">
      <h1
        className="text-emerald-500 text-5xl max-sm:text-4xl w-fit"
        style={righteous.style}
      >
        Pop
        <span className="text-purple-700">Rating</span>
      </h1>
    </Link>
  );
}

export default Logo;
