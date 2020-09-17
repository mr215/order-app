import React from 'react'
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
} from '@ionic/react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'

import { SupplierType } from 'types'
import useStores from 'hooks/useStores'

import FormikRadioGroup from './fields/FormikRadioGroup'

interface Props {
  onCancel: () => void
  onClick: (address: string) => void
}

const SupplierSelectionModal: React.FC<Props> = ({ onCancel, onClick }) => {
  const { supplierStore } = useStores()

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
  ]

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Your Supplier</IonLabel>
          </IonListHeader>

          <IonGrid>
            {mockSuppliers.map(supplier => {
              return (
                <IonRow onClick={() => onClick(supplier.address)}>
                  <IonCol size="3">
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
