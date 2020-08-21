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
}

const LogoImg = styled(IonImg)`
  height: 3rem;
  margin: 0.5rem 0;
`

const Header: React.FC<Props> = ({ home = false }) => {
  return (
    <IonHeader mode="ios">
      <IonToolbar>
        <IonButtons slot="start">
          {home ? <IonMenuButton /> : <IonBackButton defaultHref="/home" />}
        </IonButtons>

        <LogoImg src={logoImg} alt="logo" />
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
