import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-purple-500 text-slate-100 text-lg font-semibold p-5 mt-auto">
      <span>Criado por:</span>
      <Link
        className="text-emerald-400 hover:underline hover:text-emerald-200 ml-1"
        href="https://github.com/joaovsampaio"
        target="_blank"
      >
        @joaovsampaio
      </Link>
    </footer>
  );
}

export default Footer;
