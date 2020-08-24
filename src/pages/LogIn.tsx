import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel } from '@ionic/react'
import { LogInFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import LogInForm from 'forms/LogInForm'

const LogIn: React.FC<RouteComponentProps> = ({
  history }) => {
    const { userStore } = useStores()

    const handleSubmit = (values: LogInFormValues) => {
      userStore.updateUser(values)

      history.push({ pathname: '/home' })
    }

    return (
      <IonPage>
          <Header />
            <h2> Log In </h2>
             <IonLabel>
             Welcome to SupplyHound! Log in with your info below.
             </IonLabel>
        <LogInForm user={userStore.user} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default LogIn

