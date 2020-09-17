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
} from '@ionic/react'

import { SupplierType } from 'types'
import useStores from 'hooks/useStores'

interface Props {
  onCancel: () => void
  onClick: (address: string) => void
}

const mockSuppliers = [
  {
    name: 'Golden State',
    address: '123 Mock Street, San Francisco, CA',
    phone: '777-777-7777',
    type: 'General',
    img:
      'https://d2sz1kgdtrlf1n.cloudfront.net/task_images/kcBH1582952495451-ScreenShot20200228at8.59.42PM.png',
  },
  {
    name: 'Silver City',
    address: '456 Fake Road, San Rafeo, CA',
    phone: '888-888-8888',
    type: 'Lumber',
    img:
      'https://d2sz1kgdtrlf1n.cloudfront.net/task_images/wlfm1582952104279-ScreenShot20200228at8.53.27PM.png',
  },
  {
    name: 'Bronze County',
    address: '789 Pretend Ave, Mill Valley, CA',
    phone: '666-666-6666',
    type: 'Electric',
    img:
      'https://d2sz1kgdtrlf1n.cloudfront.net/task_images/dRE61582952283491-ScreenShot20200228at8.56.50PM.png',
  },
  {
    name: 'Platinum Place',
    address: '111 Imagine Ct, San Francisco, CA',
    phone: '222-222-2222',
    type: 'Hardware',
    img:
      'https://d2sz1kgdtrlf1n.cloudfront.net/task_images/diJs1582951691680-ScreenShot20200228at8.47.04PM.png',
  },
]

const SupplierSelectionModal: React.FC<Props> = ({ onCancel, onClick }) => {
  const { supplierStore } = useStores()

  const [supplierType, setSupplierType] = useState('All')

  const handleSelect = (supplierType: string) => {
    setSupplierType(supplierType)
  }

  const filterSupplierTypes = () => {
    return supplierType === 'All'
      ? mockSuppliers
      : mockSuppliers.filter(supplier => supplier.type === supplierType)
  }

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Your Supplier</IonLabel>
          </IonListHeader>

          <IonRadioGroup>
            <IonGrid>
              <IonRow>
                {Object.keys(SupplierType).map((type, index) => (
                  <IonCol size="6" key={`s-${type}${index}`}>
                    <IonItem
                      lines="full"
                      mode="ios"
                      onClick={() => handleSelect(type)}
                    >
                      <IonRadio slot="start" mode="md" value={type} />
                      <IonLabel>{type}</IonLabel>
                    </IonItem>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonRadioGroup>

          <IonGrid>
            {filterSupplierTypes().map((supplier, index) => {
              return (
                <IonRow
                  key={`supplier${index}`}
                  onClick={() => onClick(supplier.address)}
                >
                  <IonCol size="4">
                    <IonThumbnail>
                      <IonImg src={supplier.img} />
                    </IonThumbnail>
                  </IonCol>

                  <IonCol>
                    <IonRow>{supplier.name}</IonRow>
                    <IonRow>{supplier.address}</IonRow>
                    <IonRow>{supplier.phone}</IonRow>
                  </IonCol>
                </IonRow>
              )
            })}
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

export default SupplierSelectionModal
