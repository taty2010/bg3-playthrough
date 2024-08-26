export function Dropdown({ label, mapValues, set, defaultValue }) {
  return (
    <>
      <label>{label}:</label>
      <select
        name="romancedCharacter"
        onChange={(event) => {
          set ? set(event.target.value) : null;
        }}
        defaultValue={defaultValue}
      >
        {/* <option value={value}>{value}</option> */}
        {mapValues?.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
}

export function Input({ label, value, disabled }) {
  return (
    <>
      <label>{label}:</label>
      <input
        type="text"
        value={value}
        id={label}
        name={label}
        disabled={disabled}
      />
    </>
  );
}
