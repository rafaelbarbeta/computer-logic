"use client"

import { InfoButton } from "@components/InfoButton"
import { TableInfoModal } from "@components/InfoButton/TableInfoModal"
import { Input } from "@components/Input"
import { Keyboard } from "@components/Keyboard"
import { LogicInfo } from "@components/LogicInfo"
import { Page } from "@components/Page"
import { TruthTable } from "@components/TruthTable"
import { useExpressionContext } from "@contexts/ExpressionContext"
import { useEffect } from "react"

export default function CalculatorPage() {
  const { expression, result } = useExpressionContext()

  useEffect(() => {
    const input = document.querySelector(".input") as HTMLInputElement
    input.value = expression
  }, [expression])

  return (
    <Page className="flex items-center pt-20 pb-80 gap-10">
      <Input />
      <InfoButton>
        <TableInfoModal />
      </InfoButton>
      {Object.keys(result.truthTable).length > 0 && (
        <>
          <TruthTable />
          <LogicInfo />
        </>
      )}

      <Keyboard />
    </Page>
  )
}
