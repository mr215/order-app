import React, { useState, ReactElement } from 'react'

import { User } from 'types'
import UserContext from './UserContext'

interface UserContextProviderProps {
  children: ReactElement
}

function UserContextProvider(props: UserContextProviderProps): ReactElement {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    accountingEmail: '',
    password: ''
  })

  const updateUser = (values: Partial<User>) => {
    setUser({ ...user, ...values })
  }

  return <UserContext.Provider {...props} value={{ user, updateUser }} />
}

export default UserContextProvider
