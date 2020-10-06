import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION } from 'utils/config'
import { signUp } from 'utils/api'
import { serializeError } from 'utils/serializers'
import { User } from 'types'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import SignUpForm from 'forms/SignUpForm'

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async (user: User) => {
    try {
      await signUp(user)

      // Preserve email only
      userStore.updateUser({ email: user.email })

      // Redirect to the login page
      history.push({ pathname: '/login' })
    } catch (e) {
      setError(serializeError(e))
    }
  }

  return (
    <IonPage>
      <Header login />

      <SignUpForm user={userStore.user} onSubmit={handleSubmit} />

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

export default observer(SignUp)
