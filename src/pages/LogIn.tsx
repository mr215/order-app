import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonContent, IonLabel, IonItemDivider } from '@ionic/react'
import { LogInFormValues } from 'types'
import UserContext from 'contexts/UserContext'
import Header from 'components/Header'
import LogInForm from 'forms/LogInForm'

const LogIn: React.FC<RouteComponentProps> = ({
  history }) => {
    const { user, updateUser } = useContext(UserContext)

    const handleSubmit = (values: LogInFormValues) => {
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
            <h2> Log In </h2>
              <p>
                Welcome to SupplyHound! Log in with your info below.
              </p>
          </IonLabel>
          </IonItemDivider>
        <LogInForm user={user} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default LogIn

