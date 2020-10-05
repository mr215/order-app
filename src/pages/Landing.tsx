import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonToast } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { LandingFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import LandingForm from 'forms/LandingForm'

const Landing: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()
  const [error, setError] = useState('')

  const handleSubmit = async (values: LandingFormValues) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(reject, 1000)
      })

      userStore.updateUser(values)
      history.push({ pathname: '/login' })
    } catch (e) {
      setError('Error in checking email')
    }
  }

  return (
    <IonPage>
      <Header login />

      <LandingForm user={userStore.user} onSubmit={handleSubmit} />

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
