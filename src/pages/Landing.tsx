import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION, LOGIN_ROUTE, SIGNUP_ROUTE } from 'utils/config'
import { LandingFormValues } from 'types'
import useStores from 'hooks/useStores'
import { checkEmail } from 'utils/api'

import Header from 'components/Header'
import LandingForm from 'forms/LandingForm'

const Landing: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async ({ email }: LandingFormValues) => {
    try {
      const { data } = await checkEmail(email)

      userStore.updateUser({ email })

      if (data.valid) {
        history.push({ pathname: LOGIN_ROUTE })
      } else {
        history.push({ pathname: SIGNUP_ROUTE })
      }
    } catch (e) {
      setError('Error in checking email')
    }
  }

  return (
    <IonPage>
      <Header login />

      <LandingForm
        user={{ email: userStore.user.email }}
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

export default observer(Landing)
