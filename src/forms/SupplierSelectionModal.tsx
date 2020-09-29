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
  IonRouterLink,
} from '@ionic/react'
import styled from 'styled-components'
import { search, close } from 'ionicons/icons'
import { titleCase } from 'utils/formatters'

import { User } from 'types'
import useStores from 'hooks/useStores'
import { Field } from 'formik'
import FormikInput from './fields/FormikInput'
import FavoriteLocationsModal from './FavoriteLocationsModal'

interface Props {
  user: User
  onClose: () => void
  onSelect: (address: string) => void
}

const SUPPLIER_TYPES = {
  All: '',
  Lumber: 'Lumber',
  Hardware: 'Hardware',
  Plumbing: 'Plumbing',
  Electric: 'Electric',
  Landscape: 'Landscape',
  Other: 'Other',
}

const ScrollDiv = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

const ScrollItem = styled.div`
  display: inline-block;
  margin: 1rem;
`

const ItemLabel = styled.div`
  display: inline-block;
  margin: 0.5rem;
  font-size: 1.25rem;
`

const SupplierSelectionModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const { supplierStore } = useStores()

  const [supplierType, setSupplierType] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  const handleSelect = (supplierType: string) => {
    setSupplierType(supplierType)
  }

  const handleChange = (event: any) => {
    setSupplierName(event.target.value)
  }

  const filterSupplierTypes = () => {
    return supplierType === ''
      ? supplierStore.suppliers
      : supplierStore.suppliers.filter(
          supplier => supplier.type === supplierType
        )
  }

  const filterSupplierNames = () => {
    return supplierName === ''
      ? []
      : supplierStore.suppliers.filter(supplier =>
          supplier.name.includes(titleCase(supplierName))
        )
  }

  const renderSuppliers = () => {
    return (!showSearch ? filterSupplierTypes() : filterSupplierNames()).map(
      (supplier, index) => {
        return (
          <IonRow
            key={`supplier${index}`}
            onClick={() => onSelect(supplier.address)}
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
      }
    )
  }

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Your Supplier</IonLabel>

            <IonItem lines="none">
              <IonItem lines="none">
                <IonIcon
                  onClick={() => {
                    setShowSearch(!showSearch)
                  }}
                  icon={showSearch ? close : search}
                />
              </IonItem>
            </IonItem>
          </IonListHeader>

          <IonItem lines="none">
            <IonRouterLink onClick={() => setShowFavorites(true)}>
              View Favorites
            </IonRouterLink>
          </IonItem>

          {showSearch ? (
            <Field
              name="supplierName"
              component={FormikInput}
              label="Supplier Name"
              type="text"
              placeholder="Enter a Supplier Name"
              onChange={handleChange}
              formatter={titleCase}
            />
          ) : (
            <ScrollDiv>
              <IonRadioGroup>
                {Object.keys(SUPPLIER_TYPES).map((type, index) => (
                  <ScrollItem key={`${type}-${index}`}>
                    <IonRadio
                      slot="start"
                      mode="md"
                      value={type}
                      onClick={() => handleSelect(type)}
                    />
                    <ItemLabel>{type}</ItemLabel>
                  </ScrollItem>
                ))}
              </IonRadioGroup>
            </ScrollDiv>
          )}

          <IonGrid>
            {!showFavorites ? (
              renderSuppliers()
            ) : (
              <FavoriteLocationsModal onClose={onClose} onSelect={onSelect} />
            )}
          </IonGrid>
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

export default SupplierSelectionModal
