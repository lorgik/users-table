import styles from './Sort.module.css'

function Sort({ handleSortChange, handleSortDirectionChange }) {
  return (
    <div className={styles.sort}>
      <span>Сортировка по</span>
      <select className={styles.select} onChange={handleSortChange}>
        <option value="default">По умолчанию</option>
        <option value="lastName">ФИО</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="address">Адрес</option>
      </select>
      <select className={styles.select} onChange={handleSortDirectionChange}>
        <option value="default">По умолчанию</option>
        <option value="По возрастанию">По возрастанию</option>
        <option value="По убыванию">По убыванию</option>
      </select>
    </div>
  )
}

export default Sort
