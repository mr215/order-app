import React from 'react'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonItem,
} from '@ionic/react'

import useStores from 'hooks/useStores'

interface Props {
  onClose: () => void
  onSelect: (address: string) => void
}

const FavoriteLocationsModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const { userStore } = useStores()
  const { favoriteLocations } = userStore.user

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Locations</IonLabel>
          </IonListHeader>

          {favoriteLocations.map((location: string, index: number) => (
            <IonItem
              key={`${location}-${index}`}
              button
              detail={false}
              onClick={() => onSelect(location)}
            >
              <IonLabel>{location}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
        <IonButton expand="block" onClick={onClose}>
          Close
        </IonButton>
      </IonFooter>
    </IonModal>
  )
}

export default FavoriteLocationsModal
