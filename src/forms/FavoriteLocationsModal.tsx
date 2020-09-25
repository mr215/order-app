import React from 'react'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
  IonIcon,
  IonItem,
  IonRouterLink,
} from '@ionic/react'
import styled from 'styled-components'

import { star, starOutline } from 'ionicons/icons'
import useStores from 'hooks/useStores'

interface Props {
  onCancel: () => void
  onClick: (address: string) => void
}

const InfoDiv = styled.div`
  font-size: 1.25rem;
  margin: 0.5rem;
`

const mockLocations = [
  {
    name: 'Golden State',
    address: '123 Mock Street, San Francisco, CA',
  },
  {
    name: 'Silver City',
    address: '456 Fake Road, San Rafeo, CA',
  },
  {
    name: 'Bronze County',
    address: '789 Pretend Ave, Mill Valley, CA',
  },
]

const FavoriteLocationsModal: React.FC<Props> = ({ onCancel, onClick }) => {
  const { userStore } = useStores()

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Locations</IonLabel>
          </IonListHeader>

          <IonGrid>
            {mockLocations.map((location, index) => (
              <IonRow
                key={`${location}-${index}`}
                onClick={() => onClick(location.address)}
              >
                <IonItem lines="inset">
                  <IonIcon icon={star} />

                  <IonCol>
                    <InfoDiv>
                      <IonRow>{location.name}</IonRow>
                      <IonRow>{location.address}</IonRow>
                    </InfoDiv>
                  </IonCol>
                </IonItem>
              </IonRow>
            ))}

            <IonItem lines="none">
              <IonRouterLink>+ Add Another Location</IonRouterLink>
            </IonItem>
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

export default FavoriteLocationsModal
