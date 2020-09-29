import React from 'react'
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
} from '@ionic/react'
import { closeCircle } from 'ionicons/icons'

import FooterWithButton from 'components/FooterWithButton'

interface Props {
  isOpen: boolean
  favoriteAddresses: string[]
  onRemove: (address: string) => void
  onSelect: (address: string) => void
  onClose: () => void
}

const FavoriteAddresssModal: React.FC<Props> = ({
  isOpen,
  favoriteAddresses,
  onRemove,
  onSelect,
  onClose,
}) => {
  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Addresses</IonLabel>
          </IonListHeader>

          {favoriteAddresses.map((address: string, index: number) => (
            <IonItem key={index}>
              <IonLabel onClick={() => onSelect(address)}>{address}</IonLabel>

              <IonIcon
                slot="end"
                icon={closeCircle}
                onClick={() => onRemove(address)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <FooterWithButton onClick={onClose}>Close</FooterWithButton>
    </IonModal>
  )
}

export default FavoriteAddresssModal
