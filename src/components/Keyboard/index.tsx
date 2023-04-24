import { ArrowLeft, ArrowRight, Delete } from "lucide-react";
import Image from "next/image";
import { Key } from "./Key";

export function Keyboard() {
  return (
    <div className="fixed flex justify-center items-center bottom-0 h-72 w-2/6 bg-slate-800 rounded-t-lg shadow-md">
      <div className="grid grid-rows-3 grid-cols-5 gap-5 items-center justify-items-center p-10">
        <Key>
          <Image
            src="/assets/and.png"
            alt="AND operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/or.png"
            alt="OR operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/and-alt.png"
            alt="AND alt operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/or-alt.png"
            alt="OR operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key actionKey>
          <Image
            src="/assets/left-parenthesis.png"
            alt="Left parenthesis"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/conditional.png"
            alt="Conditional operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/biconditional.png"
            alt="Biconditional operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/not.png"
            alt="Not operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/xor.png"
            alt="XOR operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key actionKey>
          <Image
            src="/assets/right-parenthesis.png"
            alt="Right parenthesis"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/implication.png"
            alt="Implication operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key>
          <Image
            src="/assets/equivalence.png"
            alt="Equivalence operation"
            height={24}
            width={24}
            className="brightness-0 invert"
          />
        </Key>
        <Key actionKey>
          <ArrowLeft />
        </Key>
        <Key actionKey>
          <ArrowRight />
        </Key>
        <Key actionKey>
          <Delete />
        </Key>
      </div>
    </div>
  );
}
