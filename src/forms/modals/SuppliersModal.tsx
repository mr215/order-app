import React, { useState, useMemo } from 'react'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRadio,
  IonRadioGroup,
} from '@ionic/react'
import styled from 'styled-components'
import { search, close } from 'ionicons/icons'

import { Supplier } from 'types'

interface Props {
  isOpen: boolean
  suppliers: Supplier[]
  onClose: () => void
  onSelect: (address: string) => void
}

const SUPPLIER_TYPES: Record<string, string> = {
  All: 'All',
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

const LogoImg = styled.img`
  width: 150px;
  height: auto;
`

const SuppliersModal: React.FC<Props> = ({
  isOpen,
  suppliers,
  onSelect,
  onClose,
}) => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [supplierType, setSupplierType] = useState('All')
  const [query, setQuery] = useState('')

  const filteredSuppliersByType = useMemo(
    () =>
      supplierType === 'All'
        ? suppliers
        : suppliers.filter(supplier => supplier.type === supplierType),
    [suppliers, supplierType]
  )
  const filteredSuppliersByQuery = useMemo(
    () =>
      suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(query.toLowerCase())
      ),
    [suppliers, query]
  )
  const filteredSuppliers = useMemo(
    () => (showSearch ? filteredSuppliersByQuery : filteredSuppliersByType),
    [showSearch, filteredSuppliersByType, filteredSuppliersByQuery]
  )

  const handleSelect = (supplierType: string) => {
    setSupplierType(supplierType)
  }

  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Your Supplier</IonLabel>

            <IonItem lines="none">
              <IonItem lines="none">
                <IonIcon
                  icon={showSearch ? close : search}
                  onClick={() => setShowSearch(!showSearch)}
                />
              </IonItem>
            </IonItem>
          </IonListHeader>

          {showSearch ? (
            <IonInput
              type="text"
              placeholder="Enter Supplier Name"
              onIonChange={e => setQuery(e.detail.value!)}
            />
          ) : (
            <ScrollDiv>
              <IonRadioGroup value={supplierType}>
                {Object.keys(SUPPLIER_TYPES).map((type, index) => (
                  <ScrollItem key={`${type}-${index}`}>
                    <IonRadio
                      slot="start"
                      mode="md"
                      value={SUPPLIER_TYPES[type]}
                      onClick={() => handleSelect(SUPPLIER_TYPES[type])}
                    />
                    <ItemLabel>{type}</ItemLabel>
                  </ScrollItem>
                ))}
              </IonRadioGroup>
            </ScrollDiv>
          )}

          {filteredSuppliers.map(supplier => (
            <IonItem
              key={supplier.id}
              button
              lines="full"
              onClick={() => onSelect(supplier.address)}
            >
              <LogoImg
                slot="start"
                src={supplier.logo}
                alt={supplier.name}
                width={150}
              />

              <IonLabel className="ion-text-wrap">
                <h2>{supplier.name}</h2>
                <p>{supplier.address}</p>
                <h2>{supplier.phone}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
        <IonButton expand="block" size="large" onClick={onClose}>
          Close
        </IonButton>
      </IonFooter>
    </IonModal>
  )
}

export default SuppliersModal
