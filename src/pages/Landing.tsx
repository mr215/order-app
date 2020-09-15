import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage, IonLabel } from '@ionic/react'
import styled from 'styled-components'

import { LandingFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import LandingForm from 'forms/LandingForm'

const TitleContainer = styled.div`
  text-align: center;
  margin: 0.5rem;
`

const Title = styled.h2`
  margin-top: auto;
`

const Landing: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore } = useStores()

  const handleSubmit = (values: LandingFormValues) => {
    userStore.updateUser(values)

    //if account exists, go to login; else redirect to signup
    if (true) {
      history.push({ pathname: '/login' })
    } else {
      history.push({ pathname: '/new' })
    }
  }

  return (
    <IonPage>
      {console.log(userStore.user)}
      <Header login />
      <TitleContainer>
        <Title> Welcome to SupplyHound! </Title>
        <IonLabel>Enter your email to continue.</IonLabel>
      </TitleContainer>
      <LandingForm user={userStore.user} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default Landing
