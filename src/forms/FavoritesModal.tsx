import React, { useState } from 'react'
import {
  IonButton,
  IonItem,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
  IonThumbnail,
  IonImg,
  IonRadio,
  IonRadioGroup,
  IonIcon,
} from '@ionic/react'

import useStores from 'hooks/useStores'

interface Props {
  onCancel: () => void
  onClick: (address: string) => void
}

const FavoritesModal: React.FC<Props> = ({ onCancel, onClick }) => {
  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorites</IonLabel>
          </IonListHeader>

          <IonGrid>
            <IonRow onClick={() => console.log('s')}>
              <IonCol size="4"></IonCol>

              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
        <IonButton expand="block" onClick={onCancel}>
          Close
        </IonButton>
      </IonFooter>
    </IonModal>
  )
}

export default FavoritesModal
