import { Draggable } from "@components/Draggable"
import { Page } from "@components/Page"

export default function LanguagePage() {
  return (
    <Page className="h-full overflow-hidden">
      <Draggable id="draggable">Drag me</Draggable>
    </Page>
  )
}
