import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

import Logo from "../ui/Logo";
import Nav from "../Nav";
import DropDown from "../ui/DropDown";
import { classNames } from "@/utils/reusingClass";
import { scrollWatcher } from "@/utils/scrollWatcher";

type Props = {
  isFixed: boolean;
};

function Header({ isFixed }: Props) {
  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    if (!isFixed) return;
    scrollWatcher();
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setThemeMode(false);
    } else {
      document.documentElement.classList.remove("dark");
      setThemeMode(true);
    }
  }, [themeMode]);

  const toggleTheme = () => {
    if (themeMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    setThemeMode((prevTheme) => !prevTheme);
  };

  return (
    <header
      className={classNames(
        "primary-header z-10 flex flex-row justify-between items-center px-20 py-2 max-sm:px-2 w-full",
        isFixed ? "fixed" : "block"
      )}
    >
      <Logo />
      <div className="lg:hidden">
        <DropDown />
      </div>
      <div className="max-lg:hidden px-10 py-1 w-2/4 bg-emerald-400 border border-purple-700 rounded-full">
        <Nav />
      </div>
      <button onClick={() => toggleTheme()}>
        {themeMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" title="Tema Claro" />
        ) : (
          <MoonIcon className="h-6 w-6 text-white" title="Tema Escuro" />
        )}
      </button>
    </header>
  );
}

export default Header;
