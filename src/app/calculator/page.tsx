import { Keyboard } from "@/components/Keyboard";
import { Page } from "@/components/Page";
import { Search } from "@/components/Search";

export default function CalculatorPage() {
  return (
    <Page className="flex items-center">
      <Search />
      <Keyboard />
    </Page>
  );
}
