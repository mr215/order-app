import React from 'react'
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonToolbar,
} from '@ionic/react'
import styled from 'styled-components'

import logoImg from 'images/logo.png'

interface Props {
  home?: boolean
  login?: boolean
}

const LogoImg = styled(IonImg)`
  height: 3rem;
  margin: 0.5rem 0;
`

const Header: React.FC<Props> = ({ home = false, login = false }) => {
  return (
    <IonHeader mode="ios">
      <IonToolbar>
        <IonButtons slot="start">
          {home ? <IonMenuButton /> : 
            !login ? <IonBackButton defaultHref="/home" /> : 
            null
          }
        </IonButtons>

        <LogoImg src={logoImg} alt="logo" />
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
