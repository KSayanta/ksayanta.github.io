export default function TextBox({ caption, count, onChange }) {

  function handleChange(e) {
    const { value, name } = e.currentTarget
    onChange(prevCaption => ({
      ...prevCaption,
      [name]: value
    }))
  }

  return (
    <label key={`label${count}`} >
      <span> Text {count} </span>
      <input
        type="text"
        maxLength={30}
        id={`text${count}`}
        name={`text${count}`}
        value={caption[`text${count}`]}
        onChange={handleChange}
      />
    </label>
  )
}
