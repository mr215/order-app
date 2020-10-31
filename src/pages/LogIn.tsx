import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION, HOME_ROUTE } from 'utils/config'
import { LogInFormValues } from 'types'
import { logIn } from 'utils/api'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import LogInForm from 'forms/LogInForm'

const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
  const { appStore, userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async ({ password }: LogInFormValues) => {
    try {
      const { data } = await logIn({
        email: userStore.user.email,
        password,
      })

      // Store token
      appStore.saveToken(data.jwt)

      history.push({ pathname: HOME_ROUTE })
    } catch (e) {
      setError('Invalid password')
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
          onDidDismiss={() => setError('')}
        />
      )}
    </IonPage>
  )
}

export default observer(LogIn)
