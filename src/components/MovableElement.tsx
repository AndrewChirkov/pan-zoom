import { MouseEvent, WheelEvent, useRef, useState } from "react"

interface Transform {
  x: number
  y: number
  scale: number
}

interface MovableElementProps {
  scaleBounds?: {
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number
  }
}

export const MovableElement = (props: MovableElementProps) => {
  const { scaleBounds } = props

  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 })
  const [pan, setPan] = useState(false)
  const movableRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setPan(true)
  }

  const handleMouseUp = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setPan(false)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const clientRect = movableRef.current?.getBoundingClientRect()

    if (clientRect && pan) {
      setTransform({
        ...transform,
        x: event.clientX - clientRect.width / 2 / transform.scale,
        y: event.clientY - clientRect.height / 2 / transform.scale
      })
    }
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const clientRect = movableRef.current?.getBoundingClientRect()

    if (clientRect && pan) {
      const scaleBoundsMin = scaleBounds && scaleBounds.minHeight < clientRect.height && scaleBounds.minWidth < clientRect.width
      const scaleBoundsMax = scaleBounds && scaleBounds.maxHeight > clientRect.height && scaleBounds.maxWidth > clientRect.width
      const scale = event.deltaY > 0 ? (scaleBoundsMin ? 0.75 : 1) : (scaleBoundsMax ? 1.25 : 1)

      setTransform({
        x: event.clientX - clientRect.width / 2 / transform.scale,
        y: event.clientY - clientRect.height / 2 / transform.scale,
        scale: transform.scale * scale
      })
    }
  }

  return (
    <div
      className="movable-element"
      style={{ transform: `translateY(${transform.y}px) translateX(${transform.x}px) scale(${transform.scale})`, width: '100px', height: '100px' }}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      ref={movableRef}
    >

    </div>
  )
}