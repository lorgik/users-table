import styles from './Select.module.css'

function Select({ options, handleChange }) {
  return (
    <select className={styles.select} onChange={handleChange}>
      {options.map((o) => (
        <option key={o.label} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export default Select
