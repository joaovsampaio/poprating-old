import { forwardRef, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

type Props = {
  setSelectCategory: (category: any) => void;
};

const SelectCategory = ({ setSelectCategory }: Props) => {
  const categories = ["Filme", "Série", "Livro", "Música"];

  const valueRef = useRef<HTMLSpanElement>(null);

  return (
    <Select.Root
      onValueChange={() => setSelectCategory(valueRef.current?.innerHTML)}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] leading-none h-[35px] gap-[5px] bg-white text-purple-600 shadow-[0_2px_10px] shadow-black/10 hover:bg-gray-200 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-purple-400 outline-none"
        aria-label="Categoria"
      >
        <Select.Value placeholder="Categoria" ref={valueRef} />
        <Select.Icon className="text-purple-600">
          <ChevronDownIcon className="w-5 h-5" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-purple-600 cursor-default">
            <ChevronUpIcon className="w-5 h-5" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group className="flex flex-col">
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-purple-600 cursor-default">
            <ChevronDownIcon className="w-5 h-5" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = forwardRef(({ children, ...props }: any, forwardedRef) => {
  return (
    <Select.Item
      className="text-[13px] leading-none text-purple-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-purple-200 data-[highlighted]:text-purple-600"
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectCategory;
