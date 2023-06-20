"use client";

import { useExpressionContext } from "@/contexts/ExpressionContext";
import { Input } from "@components/Input";
import { Keyboard } from "@components/Keyboard";
import { LogicInfo } from "@components/LogicInfo";
import { Page } from "@components/Page";
import { TruthTable } from "@components/TruthTable";
import { useEffect } from "react";

export default function CalculatorPage() {
  const { expression, result } = useExpressionContext();

  useEffect(() => {
    const searchInput = document.querySelector(".search") as HTMLInputElement;
    searchInput.value = expression;
  }, [expression]);

  return (
    <Page className="flex items-center pt-20 pb-80 gap-10">
      <Input />
      {Object.keys(result.truthTable).length > 0 && (
        <>
          <TruthTable />
          <LogicInfo />
        </>
      )}

      <Keyboard />
    </Page>
  );
}
