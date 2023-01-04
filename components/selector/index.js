import styles from '@styles/select.module.css'

const options = [
  { value: "best", name: "Best 92.6" },
  { value: "imagine", name: "Imagine 89.7" },
  { value: "zucca", name: "Zucca Radio" },
  { value: "enLefko", name: "En Lefko 87.7" },
];

const StationSelector = ({ value, onSelect }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="0" defaultValue="selected">Select radio station...</option>
      {options.map(({ value, name }) => (
        <option value={value} key={value}>{name}</option>
      ))}
    </select>
  );
};

export default StationSelector;
