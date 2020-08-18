import { createContext } from 'react'

import { User } from 'types'

interface UserContextProps {
  user: User
  updateUser: (values: Partial<User>) => void
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  updateUser: () => {},
})

export default UserContext
