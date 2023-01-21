import styles from "@styles/select.module.css";
import { useMemo } from "react";

const StationSelector = ({ value, onSelect, sources }) => {
  const options = useMemo(
    () => sources.map(({ id, name }) => ({ value: id, name })),
    [sources]
  );

  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="0" defaultValue="selected">
        Select radio station...
      </option>
      {options.map(({ value, name }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default StationSelector;
