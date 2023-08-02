import { useDraggable } from "@dnd-kit/core"
import classNames from "classnames"
import { CSSProperties, ComponentProps } from "react"

import { twMerge } from "tailwind-merge"
import styles from "./Draggable.module.css"

interface DraggableItemProps extends ComponentProps<"div"> {
  label?: string
  handle?: boolean
  style?: React.CSSProperties
  buttonStyle?: React.CSSProperties
  id: string
  top?: number
  left?: number
}

export function DraggableItem({
  label,
  style,
  top,
  left,
  handle,
  buttonStyle,
  className,
  children,
  id,
  ...props
}: DraggableItemProps) {
  const { isDragging, listeners, setNodeRef, transform } = useDraggable({ id })

  const transformStyle = {
    "--translate-x": `${transform?.x ?? 0}px`,
    "--translate-y": `${transform?.y ?? 0}px`,
  } as CSSProperties

  return (
    <div
      className={classNames(
        styles.Draggable,
        isDragging && styles.dragging,
        handle && styles.handle
      )}
      style={{ top, left, ...style, ...transformStyle }}
      ref={setNodeRef}
    >
      <div
        className={twMerge(
          "shadow-[--box-shadow] text-center transition-shadow duration-300 ease-out rounded-[5px] min-w-[10rem] p-3 bg-slate-950",
          className
        )}
        aria-label="Draggable"
        data-cypress="draggable-item"
        tabIndex={handle ? -1 : undefined}
        style={buttonStyle}
        {...(handle ? {} : listeners)}
        {...props}
      >
        {children}
      </div>
      {label && <label>{label}</label>}
    </div>
  )
}
