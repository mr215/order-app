import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION } from 'utils/config'
import { LogInFormValues } from 'types'
import { logIn } from 'utils/api'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import LogInForm from 'forms/LogInForm'

const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
  const { authStore, userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async ({ password }: LogInFormValues) => {
    try {
      const { data } = await logIn({
        email: userStore.user.email,
        password,
      })

      // Store token
      authStore.saveToken(data.jwt)

      history.push({ pathname: '/home' })
    } catch (e) {
      console.log('e', e.response)
      setError('Invalid username or password')
    }
  }

  return (
    <IonPage>
      <Header login />

      <LogInForm onSubmit={handleSubmit} />

      {error && (
        <IonToast
          isOpen
          message={error}
          position="top"
          color="danger"
          mode="ios"
          duration={TOAST_DURATION}
        />
      )}
    </IonPage>
  )
}

export default observer(LogIn)
