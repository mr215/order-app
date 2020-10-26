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
import { observer } from 'mobx-react-lite'
import { closeCircle } from 'ionicons/icons'

import { FavoriteAddressEntity } from 'types'
import useStores from 'hooks/useStores'
import { deleteFavoriteAddress } from 'utils/api'
import FooterWithButton from 'components/FooterWithButton'

interface Props {
  isOpen: boolean
  onSelect: (address: string) => void
  onClose: () => void
}

const FavoriteAddresssModal: React.FC<Props> = ({
  isOpen,
  onSelect,
  onClose,
}) => {
  const { favoriteAddressesStore: store } = useStores()

  const removeFavoriteAddress = async (fa: FavoriteAddressEntity) => {
    await deleteFavoriteAddress(fa.id)

    store.remove(fa.id)
  }

  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Addresses</IonLabel>
          </IonListHeader>

          {store.favoriteAddresses.map(fa => (
            <IonItem key={fa.id}>
              <IonLabel onClick={() => onSelect(fa.attributes.address)}>
                {fa.attributes.address}
              </IonLabel>

              <IonIcon
                slot="end"
                icon={closeCircle}
                onClick={() => removeFavoriteAddress(fa)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <FooterWithButton onClick={onClose}>Close</FooterWithButton>
    </IonModal>
  )
}

export default observer(FavoriteAddresssModal)
