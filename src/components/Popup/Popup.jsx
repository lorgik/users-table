import React from 'react'
import styles from './Popup.module.css'
import { useOutsideClick } from '../../hooks/useOutsideClick'

function Popup({ handleClickOutside, currentUser }) {
  const ref = useOutsideClick(handleClickOutside)

  return (
    <div className={styles.popup}>
      <div className={styles.card} ref={ref}>
        <h3>{`${currentUser.lastName} ${currentUser.firstName} ${currentUser.maidenName}`}</h3>
        <ul className={styles.list}>
          <li>
            <span>Возраст:</span> {currentUser.age}
          </li>
          <li>
            <span>Адрес:</span> {`${currentUser.address.city}, ${currentUser.address.address}`}
          </li>
          <li>
            <span>Рост:</span> {currentUser.height}
          </li>
          <li>
            <span>Вес:</span> {currentUser.weight}
          </li>
          <li>
            <span>Номер телефона:</span> {currentUser.phone}
          </li>
          <li>
            <span>Email:</span> {currentUser.email}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Popup
