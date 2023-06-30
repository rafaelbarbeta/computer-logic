"use client";

import { CONFIG_DEFAULT } from "@constants/config";
import { ReactNode } from "react";

type RadioButtonProps = {
  id: string;
  name: string;
  children: ReactNode;
  checked?: boolean;
};

export function RadioButton({ children, id, name, checked }: RadioButtonProps) {
  function handleInputChange() {
    const config = JSON.parse(
      localStorage.getItem("@logic:config") ?? JSON.stringify(CONFIG_DEFAULT)
    );

    config[name] = id;
    localStorage.setItem(`@logic:config`, JSON.stringify(config));
  }

  return (
    <div className="flex items-center gap-1">
      <input
        id={id}
        type="radio"
        name={name}
        className="w-10 h-10 accent-slate-700 rounded-full focus:bg-red-50"
        onChange={handleInputChange}
        defaultChecked={checked}
      />
      <label htmlFor={id} className="w-full py-4 ml-2 font-bold">
        {children}
      </label>
    </div>
  );
}
