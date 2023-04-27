import { MouseEvent, WheelEvent, useRef, useState } from "react"

interface Transform {
  x: number
  y: number
  scale: number
}

interface MovableElementProps {
}

export const MovableElement = (props: MovableElementProps) => {

  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 })
  const [pan, setPan] = useState(false)
  const movableRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setPan(true)
  }

  const handleDisablePan = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setPan(false)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const clientRect = movableRef.current?.getBoundingClientRect()

    if (clientRect && pan) {
      setTransform({
        ...transform,
        x: transform.x + event.movementX,
        y: transform.y + event.movementY
      })
    }
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const clientRect = movableRef.current?.getBoundingClientRect()

    if (clientRect && pan) {
      const scale = event.deltaY > 0 ? 0.75 : 1.25

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
      onMouseUp={handleDisablePan}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleDisablePan}
      onWheel={handleWheel}
      ref={movableRef}
    >

    </div>
  )
}