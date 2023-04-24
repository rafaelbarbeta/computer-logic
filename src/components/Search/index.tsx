import { ChevronRight } from "lucide-react";
import { Button } from "../Button";

export function Search() {
  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Digite a expressão..."
        className="border-2 border-r-0 text-xl border-slate-800 outline-none bg-inherit p-5 px-8 w-1/2 rounded-l-lg"
      />
      <Button className="rounded-s-none">
        <ChevronRight size={32} />
      </Button>
    </div>
  );
}
