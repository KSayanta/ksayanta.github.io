import DragAndDrop from "./DND";

export default function CaptionText({ caption, count, parentRef }) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(
      <DragAndDrop key={i + 300} parentRef={parentRef}>
        <span className="caption">{caption[`text${i}`]}</span>
      </DragAndDrop>
    );
  }
  return arr;
}
