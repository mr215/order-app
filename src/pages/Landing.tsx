import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

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
        history.push({ pathname: '/login' })
      } else {
        history.push({ pathname: '/signup' })
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
          position="middle"
          color="danger"
          mode="ios"
          duration={2000}
        />
      )}
    </IonPage>
  )
}

export default observer(Landing)
