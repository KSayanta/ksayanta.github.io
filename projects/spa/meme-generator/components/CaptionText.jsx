export default function CaptionText({ caption, count }) {
  const arr = []
  for (let i = 1; i <= count; i++) {
    arr.push(
      <span key={i + 300} className="caption">{caption[`text${i}`]}</span>
    )
  }
  return arr
}
