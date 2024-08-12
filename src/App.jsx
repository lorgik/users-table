import { useEffect, useState } from 'react'
import styles from './App.module.css'
import Popup from '@components/Popup/Popup'
import Select from '@components/Select/Select'
import Input from '@components/Input/Input'
import { getError } from './api/users'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredUsers, fetchUsers } from './slices/usersSlice'

const searchOptions = [
  { value: 'lastname', label: 'Фамилия' },
  { value: 'firstName', label: 'Имя' },
  { value: 'maidenName', label: 'Отчество' },
  { value: 'age', label: 'Возраст' },
  { value: 'gender', label: 'Пол' },
  { value: 'phone', label: 'Номер телефона' },
  { value: 'address.city', label: 'Город' },
  { value: 'address.address', label: 'Улица' },
]

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'lastName', label: 'ФИО' },
  { value: 'age', label: 'Возраст' },
  { value: 'gender', label: 'Пол' },
  { value: 'address', label: 'Адрес' },
]
const sortDirectionOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'По возрастанию', label: 'По возрастанию' },
  { value: 'По убыванию', label: 'По убыванию' },
]

function App() {
  // const [users, setUsers] = useState([])
  const [sortedUsers, setSortedUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [filterOption, setFilterOption] = useState('lastName')
  const [sortOption, setSortOption] = useState('default')
  const [sortDirectionOption, setSortDirectionOption] = useState('default')
  const [openPopup, setOpenPopup] = useState(false)
  const [error, setError] = useState('')

  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    function load() {
      try {
        dispatch(fetchUsers())
      } catch (e) {
        setError(e.message)
        setTimeout(() => setError(''), 5000)
      }
    }

    load()
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
    const timeOutId = setTimeout(async () => {
      if (inputValue === '') {
        try {
          dispatch(fetchUsers())
        } catch (e) {
          setError(e.message)
          setTimeout(() => setError(''), 5000)
        }
      } else {
        try {
          dispatch(fetchFilteredUsers({ filterOption, inputValue }))
        } catch (e) {
          setError(e.message)
          setTimeout(() => setError(''), 5000)
        }
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

  return (
    <main className={styles.main}>
      {openPopup && <Popup handleClickOutside={() => setOpenPopup(false)} currentUser={currentUser} />}

      {error && <div className={styles.error}>{error}</div>}

      <header className={styles.header}>
        <div className={styles.search}>
          <span>Поиск по</span>
          <Select options={searchOptions} handleChange={(e) => setFilterOption(e.target.value)} />
          <Input value={inputValue} handleChange={(e) => setInputValue(e.target.value)} placeholder="Писать сюда" />
        </div>

        <button
          className={styles.button}
          onClick={async () => {
            try {
              await getError()
            } catch (e) {
              setError(e.message)
              setTimeout(() => setError(''), 5000)
            }
          }}
        >
          Вызвать ошибку
        </button>

        <div className={styles.sort}>
          <span>Сортировка по</span>
          <Select options={sortOptions} handleChange={(e) => setSortOption(e.target.value)} />
          <Select options={sortDirectionOptions} handleChange={(e) => setSortDirectionOption(e.target.value)} />
        </div>
      </header>

      <table className={styles.table}>
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
          {sortedUsers.length !== 0 ? (
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
            ))
          ) : (
            <tr className={styles.notification}>
              <td>Пользователи не найдены</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}

export default App
