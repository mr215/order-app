import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel } from '@ionic/react'
import styled from 'styled-components'

import { LogInFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import LogInForm from 'forms/LogInForm'

const TitleContainer = styled.div`
  text-align: center;
  margin: 0.5rem;
`

const Title = styled.h2`
  margin-top: auto;
`

const LogIn: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()

  const handleSubmit = (values: LogInFormValues) => {
    userStore.updateUser(values)

    history.push({ pathname: '/home' })
  }

  return (
    <IonPage>
      <Header login />

      <TitleContainer>
        <Title>Log In</Title>
        <IonLabel>Welcome Back! Log in with your info below.</IonLabel>
      </TitleContainer>

      <LogInForm user={userStore.user} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default LogIn
