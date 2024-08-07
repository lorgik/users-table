import React from 'react'
import styles from './Search.module.css'

function Search({ inputValue, handleInputChange, handleFilterChange }) {
  return (
    <div className={styles.search}>
      <span>Поиск по</span>
      <select className={styles.select} onChange={handleFilterChange}>
        <option value="lastName">Фамилия</option>
        <option value="firstName">Имя</option>
        <option value="maidenName">Отчество</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="phone">Номер телефона</option>
        <option value="address.city">Город</option>
        <option value="address.address">Улица</option>
        <option value="error">Выдать ошибку</option>
      </select>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Писать сюда"
      />
    </div>
  )
}

export default Search
