import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel, IonItemDivider } from '@ionic/react'

import { SignUpFormValues } from 'types'
import UserContext from 'contexts/UserContext'
import Header from 'components/Header'
import SignUpForm from 'forms/SignUpForm'

const SignUp: React.FC<RouteComponentProps> = ({
  history }) => {
    const { user, updateUser } = useContext(UserContext)

    const handleSubmit = (values: SignUpFormValues) => {
      updateUser(values)
      
      setTimeout(() => {
        history.push({ pathname: '/home' })
      })
    }

    return (
      <IonPage>
          <Header />
          <IonItemDivider>
            <IonLabel>
              <h2> Sign Up </h2>
                <p>
                    Welcome to SupplyHound! Please enter your info below to get started.
                </p>
            </IonLabel>
          </IonItemDivider>
          <SignUpForm user={user} onSubmit={handleSubmit} />
      </IonPage>
    )
  }
  
export default SignUp
