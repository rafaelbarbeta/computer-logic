"use client";

import { HTMLProps, ReactNode, useEffect, useState } from "react";
import { AnimatedWord } from "./AnimatedWord";

type AnimatedTitleProps = {
  children: ReactNode;
} & HTMLProps<HTMLHeadingElement>;

export function AnimatedTitle({ children, ...props }: AnimatedTitleProps) {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const title = children?.toString() ?? "";
    setWords(title.split(" "));
  }, [children]);

  return (
    <div className="flex gap-5 select-none">
      {words &&
        words.map((word, i) => (
          <AnimatedWord key={i} id={`animated-text-${i}`} {...props}>
            {word}
          </AnimatedWord>
        ))}
    </div>
  );
}
