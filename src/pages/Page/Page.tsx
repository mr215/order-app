import React from 'react'
import { useParams } from 'react-router'
import { IonContent, IonLabel, IonPage } from '@ionic/react'
import Header from 'components/Header/Header'

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>()

  return (
    <IonPage>
      <Header />

      <IonContent>
        <IonLabel>{name}</IonLabel>
      </IonContent>
    </IonPage>
  )
}

export default Page
