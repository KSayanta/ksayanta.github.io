export default function TextBox({ caption, count, onChange }) {
  const arr = [];

  function handleChange(e) {
    const { value, name } = e.currentTarget;
    onChange(prevCaption => ({
      ...prevCaption,
      [name]: value,
    }));
  }

  for (let i = 1; i <= count; i++) {
    arr.push(
      <label key={`label${i}`}>
        <span> Text {i} </span>
        <input
          type="text"
          maxLength={30}
          id={`text${i}`}
          name={`text${i}`}
          value={caption[`text${i}`]}
          onChange={handleChange}
        />
      </label>
    );
  }

  return arr;
}
