"use client";

import { TruthTable } from "@/components/TruthTable";
import { Keyboard } from "@components/Keyboard";
import { Page } from "@components/Page";
import { Search } from "@components/Search";

export default function CalculatorPage() {
  return (
    <Page className="flex items-center gap-10">
      <Search />
      <TruthTable />
      <Keyboard />
    </Page>
  );
}
