import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Search from './components/Search/Search'
import Sort from './components/Sort/Sort'
import Popup from './components/Popup/Popup'

function App() {
  const [users, setUsers] = useState([])
  const [sortedUsers, setSortedUsers] = useState([])
  const [filterOption, setFilterOption] = useState('lastName')
  const [inputValue, setInputValue] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [sortDirectionOption, setSortDirectionOption] = useState('default')
  const [currentUser, setCurrentUser] = useState({})
  const [openPopup, setOpenPopup] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    setSortedUsers(users)
  }, [users])

  useEffect(() => {
    const body = document.querySelector('body')

    if (openPopup) {
      body.classList.add('blocked')
    } else {
      body.classList.remove('blocked')
    }
  }, [openPopup])

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
      .catch((e) => setError(e.message))
  }

  function getFilteredUsers() {
    fetch(`https://dummyjson.com/users/filter?key=${filterOption}&value=${encodeURIComponent(inputValue)}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((e) => setError(e.message))
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
      {openPopup && <Popup handleClickOutside={handleClickOutside} currentUser={currentUser} />}

      <header className={styles.header}>
        <Search inputValue={inputValue} handleInputChange={handleInputChange} handleFilterChange={handleFilterChange} />
        <Sort handleSortChange={handleSortChange} handleSortDirectionChange={handleSortDirectionChange} />
      </header>
      {error && <div className={styles.error}>{error}</div>}
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
