import { MovableElement } from "./MovableElement"

export const ParentContainer = () => {
  const scaleBoundForAll = { minHeight: 50, minWidth: 50, maxHeight: 500, maxWidth: 500 }

  return (
    <div
      className="parent-container"
    >
      <MovableElement scaleBounds={scaleBoundForAll} />
    </div>
  )
}