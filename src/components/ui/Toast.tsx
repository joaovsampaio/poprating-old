import { Dispatch, SetStateAction } from "react";
import * as Toast from "@radix-ui/react-toast";
import { NoSymbolIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/utils/reusingClass";

type Props = {
  title: string;
  description: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  error: boolean;
};

function CustomToast({ title, description, open, setOpen, error }: Props) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={classNames(
          "bg-emerald-400 rounded-md shadow-md shadow-slate-800 p-2",
          error && "bg-red-500"
        )}
        open={open}
        onOpenChange={setOpen}
        onClick={() => setOpen(false)}
      >
        <Toast.Title
          className={classNames(
            "text-purple-700 text-2xl font-bold",
            error && "text-white"
          )}
        >
          {!error ? (
            title
          ) : (
            <span className="flex items-center gap-2">
              <NoSymbolIcon className="h-8 w-8 text-white" />
              Algo Deu Errado
            </span>
          )}
        </Toast.Title>
        <Toast.Description
          className={classNames("text-slate-500", error && "hidden")}
        >
          {description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
export default CustomToast;
