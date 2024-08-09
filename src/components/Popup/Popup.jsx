import React from 'react'
import styles from './Popup.module.css'
import { useOutsideClick } from '@hooks/useOutsideClick'

function Popup({ handleClickOutside, currentUser }) {
  const ref = useOutsideClick(handleClickOutside)

  return (
    <div className={styles.popup}>
      <div className={styles.card} ref={ref}>
        <h3 className={styles.title}>{`${currentUser.lastName} ${currentUser.firstName} ${currentUser.maidenName}`}</h3>
        <ul className={styles.list}>
          <li>
            <span className={styles.name}>Возраст:</span> <span className={styles.value}>{currentUser.age}</span>
          </li>
          <li>
            <span>Адрес:</span> <span>{`${currentUser.address.city}, ${currentUser.address.address}`}</span>
          </li>
          <li>
            <span>Рост:</span> <span>{currentUser.height}</span>
          </li>
          <li>
            <span>Вес:</span> <span>{currentUser.weight}</span>
          </li>
          <li>
            <span>Email:</span> <span>{currentUser.email}</span>
          </li>
          <li>
            <span>Номер телефона:</span> <span>{currentUser.phone}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Popup
