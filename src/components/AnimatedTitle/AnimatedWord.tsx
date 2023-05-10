"use client";

import { HTMLProps, ReactNode, useEffect } from "react";

type AnimatedWordProps = {
  children: ReactNode;
  id: string;
} & HTMLProps<HTMLHeadingElement>;

export function AnimatedWord({
  children,
  className,
  id,
  ...props
}: AnimatedWordProps) {
  useEffect(() => {
    const animateLetters = (selector: string) => {
      const title = document.querySelector(selector) as HTMLHeadingElement;
      const originalWords = title.textContent?.split(" ") ?? [];
      const originalLetters = title.textContent?.split("") ?? [];
      const wrappedLetters = originalLetters
        .map((letter) => {
          return `<span class="${id}-letter ${className}">${letter}</span>`;
        })
        .join("");

      title.outerHTML = `<div class="flex">${wrappedLetters}</div>`;

      const letters = document.querySelectorAll(
        `.${id}-letter`
      ) as NodeListOf<HTMLSpanElement>;

      return () => {
        letters.forEach((el, i) => {
          let number = Math.random() > 0.5 ? 0 : 1;

          const animationTime = Math.floor(i * 30);
          let timesToAnimate = i;

          const animationInterval = setInterval(() => {
            number = number === 1 ? 0 : 1;
            el.textContent = number.toString();
            el;

            if (timesToAnimate === 0) {
              clearInterval(animationInterval);
              el.textContent = originalLetters[i];
            }
            timesToAnimate--;
          }, animationTime);
        });
      };
    };

    animateLetters(`#${id}`)();
  }, [className, id]);

  return (
    <h1 id={id} className={className} {...props}>
      {children}
    </h1>
  );
}
