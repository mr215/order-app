import React from 'react'
import {
  IonBackButton,
  IonHeader,
  IonMenuButton,
  IonToolbar,
} from '@ionic/react'
import styled from 'styled-components'

import logoImg from 'images/logo.png'

interface Props {
  home?: boolean
  login?: boolean
}

const StyledToolbar = styled(IonToolbar)`
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
  text-align: center;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.25rem;
  width: auto;

  display: flex;
  align-items: center;
`

const LogoImg = styled.img`
  height: 3rem;
`

const Header: React.FC<Props> = ({ home = false, login = false }) => (
  <IonHeader mode="ios">
    <StyledToolbar>
      <ButtonContainer>
        {home ? (
          <IonMenuButton />
        ) : (
          !login && <IonBackButton defaultHref="/home" />
        )}
      </ButtonContainer>

      <LogoImg src={logoImg} alt="logo" />
    </StyledToolbar>
  </IonHeader>
)

export default Header
