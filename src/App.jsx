import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Search from './components/Search/Search'
import Sort from './components/Sort/Sort'
import { useOutsideClick } from './hooks/useOutsideClick'

function App() {
  const [users, setUsers] = useState([])
  const [sortedUsers, setSortedUsers] = useState([])
  const [filterOption, setFilterOption] = useState('lastName')
  const [inputValue, setInputValue] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [sortDirectionOption, setSortDirectionOption] = useState('default')
  const [currentUser, setCurrentUser] = useState({})
  const [openPopup, setOpenPopup] = useState(false)

  const ref = useOutsideClick(handleClickOutside)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    setSortedUsers(users)
  }, [users])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (inputValue === '') {
        getUsers()
      } else {
        getFilteredUsers()
      }
    }, 500)

    return () => clearTimeout(timeOutId)
  }, [inputValue, filterOption])

  useEffect(() => {
    if (sortOption === 'default' || sortDirectionOption === 'default') {
      setSortedUsers(users)
      return
    }

    const sortedUsers = users.toSorted((a, b) => {
      if (sortOption === 'address') {
        if (sortDirectionOption === 'По возрастанию') {
          return a[sortOption]['city'] > b[sortOption]['city'] ? 1 : -1
        }
        return b[sortOption]['city'] > a[sortOption]['city'] ? 1 : -1
      }

      if (sortDirectionOption === 'По возрастанию') {
        return a[sortOption] > b[sortOption] ? 1 : -1
      }
      return b[sortOption] > a[sortOption] ? 1 : -1
    })

    setSortedUsers(sortedUsers)
  }, [sortOption, sortDirectionOption])

  function getUsers() {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
  }

  function getFilteredUsers() {
    fetch(`https://dummyjson.com/users/filter?key=${filterOption}&value=${encodeURIComponent(inputValue)}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleFilterChange(e) {
    setFilterOption(e.target.value)
  }

  function handleSortChange(e) {
    setSortOption(e.target.value)
  }

  function handleSortDirectionChange(e) {
    setSortDirectionOption(e.target.value)
  }

  function handleClickOutside() {
    setOpenPopup(false)
  }

  return (
    <main className={styles.main}>
      {openPopup && (
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
      )}

      <header className={styles.header}>
        <Search inputValue={inputValue} handleInputChange={handleInputChange} handleFilterChange={handleFilterChange} />
        <Sort handleSortChange={handleSortChange} handleSortDirectionChange={handleSortDirectionChange} />
      </header>

      <table className={styles.table}>
        {/* <caption>Информация о пользователях</caption> */}
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers &&
            sortedUsers.map((u) => (
              <tr
                key={u.id}
                onClick={() => {
                  setCurrentUser(u)
                  setOpenPopup(true)
                }}
              >
                <td>{`${u.lastName} ${u.firstName} ${u.maidenName}`}</td>
                <td>{u.age}</td>
                <td>{u.gender}</td>
                <td>{u.phone}</td>
                <td>{`${u.address.city}, ${u.address.address}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  )
}

export default App
