import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bars3Icon } from "@heroicons/react/24/solid";

import Nav from "@/components/Nav";

function DropDown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Mais">
          <Bars3Icon className="h-6 w-6 text-purple-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-emerald-400 border rounded-md border-purple-800 p-3 lg:hidden"
          sideOffset={5}
        >
          <DropdownMenu.Item>
            <Nav />
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-purple-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropDown;
