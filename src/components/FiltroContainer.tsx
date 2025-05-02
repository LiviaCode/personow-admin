import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Option = {
  label: string;
  value: string;
};

type FiltroContainerProps = {
  title: string;
  selectOptions?: Option[];
  children: React.ReactNode;
} & React.ComponentProps<"input">;

export function FiltroContainer({
  title,
  selectOptions,
  children,
}: FiltroContainerProps) {
  return (
    <div className="space-y-4 p-6">
      <div className="justify- flex items-center text-2xl font-semibold text-text-web">
        {title}
      </div>
      <Separator />

      <div className="flex items-center justify-start">
        <label htmlFor="filter" className="md:mr-2">
          Filtros:{" "}
        </label>
        <input
          name="filter"
          type="text"
          placeholder="Nome"
          className="w-full max-w-xs rounded-[8px] border border-secondary-web p-2 focus:outline-none"
        ></input>
        {selectOptions && (
          <select className="mx-3 w-full max-w-xs rounded-[8px] border border-secondary-web p-2 focus:outline-none">
            {selectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        <Button className="w-full max-w-[50px] md:w-auto">
          <Search />
        </Button>
      </div>
      {children}
    </div>
  );
}

export function MobileFiltroContainer({
  title,
  children,
}: FiltroContainerProps) {
  return (
    <div className="h-full space-y-4 rounded-t-[15px] bg-purple-900 p-3 text-gray-200">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center justify-start space-x-2">
        <input
          name="filter"
          type="text"
          placeholder="Pesquisar"
          className="h-8 w-full max-w-xs rounded-[8px] border border-secondary-web p-2 focus:outline-none"
        ></input>
        <button className="h-8 rounded-[8px] bg-orange-500 p-2 focus:outline-none">
          <SlidersHorizontal size={15} />
        </button>
      </div>
      {children}
    </div>
  );
}
