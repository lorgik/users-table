async function getUsers() {
  const res = await fetch('https://dummyjson.com/users')
  if (!res.ok) {
    throw new Error(`Error` + `,  ${res.statusText}`)
  }

  const data = await res.json()
  return data.users
}

async function getFilteredUsers(filterOption, inputValue) {
  const res = await fetch(
    `https://dummyjson.com/users/filter?key=${filterOption}&value=${encodeURIComponent(inputValue)}`
  )
  if (!res.ok) {
    throw new Error(`Error` + `,  ${res.statusText}`)
  }

  const data = await res.json()
  return data.users
}

async function getError() {
  const res = await fetch('https://dummyjson.com/users/error')
  if (!res.ok) {
    throw new Error(`Error` + `,  ${res.statusText}`)
  }

  const data = await res.json()
  return data.users
}

export { getUsers, getFilteredUsers, getError }
