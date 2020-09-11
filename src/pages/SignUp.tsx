import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel } from '@ionic/react'
import styled from 'styled-components'

import { SignUpFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import SignUpForm from 'forms/SignUpForm'

const TitleContainer = styled.div`
  text-align: center;
  margin: 0.5rem;
`

const Title = styled.h2`
  margin-top: auto;
`

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()

  const handleSubmit = (values: SignUpFormValues) => {
    userStore.updateUser(values)

    history.push({ pathname: '/home' })
  }

  return (
    <IonPage>
      <Header login />
      <TitleContainer>
        <Title> Sign Up </Title>
        <IonLabel>
          Welcome to SupplyHound! Please enter your info below to get started.
        </IonLabel>
      </TitleContainer>
      <SignUpForm user={userStore.user} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default SignUp
