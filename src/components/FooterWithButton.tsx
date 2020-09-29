import React, { ComponentProps, ReactNode } from 'react'
import { IonFooter, IonButton } from '@ionic/react'

interface Props extends ComponentProps<typeof IonButton> {
  children: ReactNode
}

const FooterWithButton: React.FC<Props> = ({ children, ...buttonProps }) => (
  <IonFooter mode="ios" className="ion-padding ion-no-border">
    <IonButton {...buttonProps} expand="block" size="large">
      {children}
    </IonButton>
  </IonFooter>
)

export default FooterWithButton
