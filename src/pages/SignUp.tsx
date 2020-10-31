import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION, HOME_ROUTE } from 'utils/config'
import { signUp } from 'utils/api'
import { serializeError } from 'utils/serializers'
import { User } from 'types'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import SignUpForm from 'forms/SignUpForm'

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const { appStore, userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async (user: User) => {
    try {
      const { data } = await signUp(user)

      appStore.setToken(data.jwt)

      history.push({ pathname: HOME_ROUTE })
    } catch (e) {
      setError(serializeError(e))
    }
  }

  return (
    <IonPage>
      <Header login />

      <SignUpForm
        user={userStore.user}
        marketOptions={appStore.marketOptions}
        onSubmit={handleSubmit}
      />

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

export default observer(SignUp)
