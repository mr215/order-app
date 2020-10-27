import React from 'react'
import { IonContent, IonLabel, IonPage } from '@ionic/react'
import Header from 'components/Header'

const PaymentSetup: React.FC = () => {
  // TODO: Load payment info
  // If customer is not created, create the stripe customer
  // Create SetupIntent and get stripe_setup_intent_client_secret
  // Collect card details using stripe.js
  // Submit payment

  return (
    <IonPage>
      <Header />

      <IonContent>
        <IonLabel>Setup Payment</IonLabel>
      </IonContent>
    </IonPage>
  )
}

export default PaymentSetup
