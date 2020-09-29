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

interface Props {
  isOpen: boolean
  favoriteAddresses: string[]
  onSelect: (address: string) => void
  onClose: () => void
}

const FavoriteAddresssModal: React.FC<Props> = ({
  isOpen,
  favoriteAddresses,
  onSelect,
  onClose,
}) => {
  const handleRemove = (index: number) => () => {
    // TODO
    console.log('handleRemove', index)
  }

  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Addresses</IonLabel>
          </IonListHeader>

          {favoriteAddresses.map((address: string, index: number) => (
            <IonItem key={`${address}-${index}`}>
              <IonLabel onClick={() => onSelect(address)}>{address}</IonLabel>

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
