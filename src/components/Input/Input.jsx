import styles from './Input.module.css'

const Input = ({ value, handleChange, placeholder }) => {
  return <input className={styles.input} type="text" value={value} onChange={handleChange} placeholder={placeholder} />
}

export default Input
