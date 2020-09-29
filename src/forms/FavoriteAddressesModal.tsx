import React from 'react'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonItem,
} from '@ionic/react'
import { closeCircle } from 'ionicons/icons'

import useStores from 'hooks/useStores'

interface Props {
  onClose: () => void
  onSelect: (address: string) => void
}

const FavoriteAddresssModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const { userStore } = useStores()
  const { favoriteAddresses } = userStore.user

  const handleRemove = (index: number) => () => {
    console.log('handleRemove', index)
  }

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Addresses</IonLabel>
          </IonListHeader>

          {favoriteAddresses.map((location: string, index: number) => (
            <IonItem key={`${location}-${index}`}>
              <IonLabel onClick={() => onSelect(location)}>{location}</IonLabel>

              <IonIcon
                slot="end"
                icon={closeCircle}
                onClick={handleRemove(index)}
              />
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

export default FavoriteAddresssModal
