import { useEffect, useState, useRef } from "react";

const DragAndDrop = ({ children, parentRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [xTranslate, setXTranslate] = useState(0);
  const [yTranslate, setYTranslate] = useState(0);
  const [initialMousePosition, setInitialMousePosition] = useState({});
  const draggableRef = useRef(null);

  useEffect(() => {
    const onMouseMove = e => {
      const parentRect = parentRef.current.getBoundingClientRect();
      const draggableRect = draggableRef.current.getBoundingClientRect();

      const newX = xTranslate + e.clientX - initialMousePosition.x;
      const newY = yTranslate + e.clientY - initialMousePosition.y;

      const minX = 0;
      const minY = 0;
      const maxX = parentRect.width - draggableRect.width;
      const maxY = parentRect.height - draggableRect.height;

      const clampedX = Math.max(minX, Math.min(maxX, newX));
      const clampedY = Math.max(minY, Math.min(maxY, newY));

      setXTranslate(clampedX);
      setYTranslate(clampedY);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isDragging, initialMousePosition]);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  const onMouseDown = e => {
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  return (
    <div
      ref={draggableRef}
      style={{
        position: "absolute",
        display: "inline-block",
        transform: `translate(${xTranslate}px,${yTranslate}px)`,
      }}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
