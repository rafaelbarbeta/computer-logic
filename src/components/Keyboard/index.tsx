"use client"

import { ArrowLeft, ArrowRight, Delete } from "lucide-react"
import Image from "next/image"
import { MouseEvent } from "react"
import { Key } from "./Key"

export function Keyboard() {
  function handleKeyPress(e: MouseEvent) {
    const input = document.querySelector(".input") as HTMLInputElement
    const key = (e.currentTarget as HTMLButtonElement).value

    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0

    if (key === "delete") {
      input.value = input.value.slice(0, start - 1) + input.value.slice(end)
      input.focus()
      input.selectionStart = input.selectionEnd = start - 1
    } else if (key === "<" || key === ">") {
      input.focus()
      input.selectionStart = input.selectionEnd =
        key === "<" ? start - 1 : start + 1
    } else {
      input.value = input.value.slice(0, start) + key + input.value.slice(end)
      input.focus()
      input.selectionStart = input.selectionEnd = start + key.length
    }
  }

  return (
    <div className="keyboard fixed max-sm:hidden flex justify-center items-center bottom-0 transition-all duration-300 h-72 bg-slate-800 rounded-t-lg shadow-md">
      <div className="grid grid-rows-3 grid-cols-5 gap-5 items-center justify-items-center p-10">
        <Key onClick={handleKeyPress} value="∧">
          <Image
            src="/assets/and.png"
            alt="AND operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="∨">
          <Image
            src="/assets/or.png"
            alt="OR operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="·">
          <Image
            src="/assets/and-alt.png"
            alt="AND alt operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="+">
          <Image
            src="/assets/or-alt.png"
            alt="OR operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="(" actionKey>
          <Image
            src="/assets/left-parenthesis.png"
            alt="Left parenthesis"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="⟶">
          <Image
            src="/assets/conditional.png"
            alt="Conditional operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="⟷">
          <Image
            src="/assets/biconditional.png"
            alt="Biconditional operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="⟹">
          <Image
            src="/assets/implication.png"
            alt="Implication operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="⟺">
          <Image
            src="/assets/equivalence.png"
            alt="Equivalence operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value=")" actionKey>
          <Image
            src="/assets/right-parenthesis.png"
            alt="Right parenthesis"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="¬">
          <Image
            src="/assets/not.png"
            alt="Not operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="⊕">
          <Image
            src="/assets/xor.png"
            alt="XOR operation"
            height={24}
            width={24}
            className="brightness-0 invert pointer-events-none"
          />
        </Key>
        <Key onClick={handleKeyPress} value="<" actionKey>
          <ArrowLeft />
        </Key>
        <Key onClick={handleKeyPress} value=">" actionKey>
          <ArrowRight />
        </Key>
        <Key onClick={handleKeyPress} value="delete" actionKey>
          <Delete />
        </Key>
      </div>
    </div>
  )
}
