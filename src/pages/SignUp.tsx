import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel } from '@ionic/react'

import { SignUpFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import SignUpForm from 'forms/SignUpForm'

const SignUp: React.FC<RouteComponentProps> = ({
  history }) => {
    const { userStore } = useStores()

    const handleSubmit = (values: SignUpFormValues) => {
      userStore.updateUser(values)
      
      history.push({ pathname: '/home' })
    }

    return (
      <IonPage>
          <Header login/>
          <div style={{
              textAlign: 'center',
              margin: '0.5rem',
          }}>
            <h2> Sign Up </h2>
            <IonLabel>
              Welcome to SupplyHound! Please enter your info below to get started.
            </IonLabel>
          </div>
          <SignUpForm user={userStore.user} onSubmit={handleSubmit} />
      </IonPage>
    )
  }
  
export default SignUp
