import { Info } from "lucide-react";
import { ReactNode, useState } from "react";

type InfoButtonProps = {
  children: ReactNode;
};

export function InfoButton({ children }: InfoButtonProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleToggleModal() {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.classList.toggle("overflow-hidden");
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <button
        className="absolute right-32 mt-5 p-3 rounded-full"
        onClick={handleToggleModal}
      >
        <Info size={30} />
      </button>
      {modalIsOpen && (
        <>
          <div
            className="shadow bg-zinc-900/70 fixed w-full h-full left-0 top-0 z-10"
            onClick={handleToggleModal}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit z-10">
            <div className="bg-slate-800 flex flex-col justify-center max-h-[90%] p-10 rounded-lg shadow-xl overflow-auto">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}
