import { Calculator, HelpCircle, Home, Settings } from "lucide-react";
import { Button } from "../Button";

export function Menu() {
  return (
    <menu className="bg-slate-800 w-24 h-screen fixed left-0 flex flex-col justify-center items-center gap-5 shadow-lg">
      <Button href="/" onlyIcon>
        <Home size={32} />
      </Button>
      <Button href="/calculator" onlyIcon>
        <Calculator size={32} />
      </Button>
      <Button onlyIcon>
        <HelpCircle size={32} />
      </Button>
      <Button onlyIcon>
        <Settings size={32} />
      </Button>
    </menu>
  );
}
