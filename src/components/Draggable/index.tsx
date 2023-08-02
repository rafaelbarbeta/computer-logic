"use client"

import {
  DndContext,
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import type { Coordinates } from "@dnd-kit/utilities"
import React, { ComponentProps, ReactNode, useState } from "react"

import { restrictToParentElement } from "@dnd-kit/modifiers"
import { DraggableItem } from "./DraggableItem"

const defaultCoordinates = {
  x: 0,
  y: 0,
}

interface DraggableProps extends ComponentProps<"div"> {
  activationConstraint?: PointerActivationConstraint
  handle?: boolean
  modifiers?: Modifiers
  buttonStyle?: React.CSSProperties
  style?: React.CSSProperties
  label?: string
  id: string
  children: ReactNode
}

export function Draggable({
  activationConstraint,
  handle,
  label,
  modifiers,
  style,
  children,
  id,
  ...props
}: DraggableProps) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  })
  const keyboardSensor = useSensor(KeyboardSensor, {})
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => ({ x: x + delta.x, y: y + delta.y }))
      }}
      modifiers={modifiers || [restrictToParentElement]}
    >
      <DraggableItem
        label={label}
        handle={handle}
        top={y}
        left={x}
        style={style}
        id={id}
        {...props}
      >
        {children}
      </DraggableItem>
    </DndContext>
  )
}
