import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../Button";

type KeyProps = {
  children: ReactNode;
  actionKey?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Key({ children, actionKey = false, ...props }: KeyProps) {
  return (
    <Button
      className={`${
        actionKey ? "bg-slate-600" : "bg-slate-500"
      } w-20 rounded-none rounded-bl-xl shadow-md flex justify-center items-center`}
      {...props}
    >
      {children}
    </Button>
  );
}
