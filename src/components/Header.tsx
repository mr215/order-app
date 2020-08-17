import React from 'react'
import {
  IonButtons,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonToolbar,
} from '@ionic/react'
import styled from 'styled-components'

import logoImg from 'images/logo.png'

const LogoImg = styled(IonImg)`
  height: 3rem;
  margin: 0.5rem 0;
`

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <LogoImg src={logoImg} alt="logo" />
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
