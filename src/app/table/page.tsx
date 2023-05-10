"use client";

import { Search } from "@/components/Search";
import { TruthTable } from "@/components/TruthTable";
import { Keyboard } from "@components/Keyboard";
import { Page } from "@components/Page";
import { useState } from "react";

export default function CalculatorPage() {
  const [hasInput, setHasInput] = useState(false);

  return (
    <Page className="flex items-center pt-20 gap-10">
      <Search />
      <TruthTable />
      <Keyboard />
    </Page>
  );
}
