"use client";

import { isValidExpression } from "@/utils/functions/manipulateExpression";
import { ResultType } from "@@types/expression";
import { useExpressionContext } from "@contexts/ExpressionContext";
import { ChevronRight } from "lucide-react";
import { Fira_Code } from "next/font/google";
import { KeyboardEvent } from "react";
import { Button } from "../Button";

const firaCode = Fira_Code({ subsets: ["latin"] });

export function Input() {
  const { resolveLogic, setExpression, setResult } = useExpressionContext();

  function toggleKeyboard(state: "open" | "close") {
    const keyboard = document.querySelector(".keyboard") as HTMLDivElement;

    if (state === "close") keyboard.classList.replace("bottom-0", "-bottom-60");
    else keyboard.classList.replace("-bottom-60", "bottom-0");
  }

  async function handleResult() {
    const input = document.querySelector(".input") as HTMLInputElement;
    const button = document.querySelector(".input-btn") as HTMLButtonElement;

    const expression = input.value.toUpperCase() ?? "";
    if (input.value && !button.disabled) await resolveLogic(expression);

    toggleKeyboard("close");
  }

  function insertInCursor(chr: string) {
    const input = document.querySelector(".input") as HTMLInputElement;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    input.value = input.value.slice(0, start) + chr + input.value.slice(end);
    input.focus();
    input.selectionStart = input.selectionEnd = start + chr.length;
  }

  function handleInputEntry(e: KeyboardEvent) {
    const input = document.querySelector(".input") as HTMLInputElement;

    const shortcutsValues = [
      "AND",
      "XOR",
      "OR",
      "NOT",
      "BCOND",
      "COND",
      "EQUIV",
      "IMPL",
    ];

    const char = e.key;
    const allowedChars = new RegExp("[A-Za-z0-1()+\b]+");
    if (!char.match(allowedChars)) e.preventDefault();

    shortcutsValues.forEach((shortcut) => {
      if (input.value.toUpperCase().includes(shortcut)) {
        switch (shortcut) {
          case "AND":
            insertInCursor("∧");
            break;
          case "OR":
            insertInCursor("∨");
            break;
          case "COND":
            insertInCursor("⟶");
            break;
          case "XOR":
            insertInCursor("⊕");
            break;
          case "NOT":
            insertInCursor("¬");
            break;
          case "BCOND":
            insertInCursor("⟷");
            break;
          case "IMPL":
            insertInCursor("⟹");
            break;
          case "EQUIV":
            insertInCursor("⟺");
            break;
          default:
            break;
        }

        const start = input.selectionStart ?? 0;

        input.value = input.value.toUpperCase().replace(shortcut, "");
        input.selectionStart = input.selectionEnd = start - shortcut.length;
      }
    });
  }

  function validateEntry() {
    const input = document.querySelector(".input") as HTMLInputElement;
    const button = document.querySelector(".input-btn") as HTMLButtonElement;

    const isInvalid = !isValidExpression(input.value.toUpperCase());

    setExpression(input.value);

    input.style.borderColor = isInvalid ? "#993333" : "#1F2A3C";
    button.style.backgroundColor = isInvalid ? "#993333" : "#1F2A3C";
    button.disabled = isInvalid;

    if (!isInvalid) handleResult();
  }

  return (
    <div className={`${firaCode.className} flex justify-center w-full`}>
      <input
        type="text"
        placeholder="Digite a expressão..."
        className="input border-2 border-r-0 text-2xl uppercase placeholder:normal-case border-slate-800 outline-none bg-inherit p-5 px-8 w-1/2 rounded-l-lg"
        onKeyUp={(e) => {
          handleInputEntry(e);
          validateEntry();
        }}
        onKeyPress={handleInputEntry}
        onFocus={() => toggleKeyboard("open")}
        onChange={() => {
          const input = document.querySelector(".input") as HTMLInputElement;
          setExpression(input.value);
          if (!input.value) setResult({ truthTable: {} } as ResultType);
        }}
      />
      <Button className="input-btn rounded-s-none" onClick={handleResult}>
        <ChevronRight size={32} />
      </Button>
    </div>
  );
}
