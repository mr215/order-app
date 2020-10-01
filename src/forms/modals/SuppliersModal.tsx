import React, { memo, useState, useMemo } from 'react'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import styled from 'styled-components'
import { search, close } from 'ionicons/icons'

import { Supplier } from 'types'
import FooterWithButton from 'components/FooterWithButton'

const SUPPLIER_TYPES: Record<string, string> = {
  All: 'All',
  Lumber: 'Lumber',
  Hardware: 'Hardware',
  Plumbing: 'Plumbing',
  Electric: 'Electric',
  Landscape: 'Landscape',
  Other: 'Other',
}

interface Props {
  isOpen: boolean
  suppliers: Supplier[]
  onClose: () => void
  onSelect: (address: string) => void
}

const StyledIonSegmentButton = styled(IonSegmentButton)`
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;

  min-width: 100px;
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

  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Select Supplier</IonLabel>

            <IonButton onClick={() => setShowSearch(!showSearch)}>
              <IonIcon icon={showSearch ? close : search} />
            </IonButton>
          </IonListHeader>

          {showSearch ? (
            <IonItem>
              <IonInput
                type="text"
                placeholder="Enter Supplier Name"
                onIonChange={e => setQuery(e.detail.value!)}
              />
            </IonItem>
          ) : (
            <IonSegment
              scrollable
              mode="ios"
              value={supplierType}
              onIonChange={e => setSupplierType(e.detail.value!)}
            >
              {Object.keys(SUPPLIER_TYPES).map(type => (
                <StyledIonSegmentButton key={type} value={type}>
                  <IonLabel>{SUPPLIER_TYPES[type]}</IonLabel>
                </StyledIonSegmentButton>
              ))}
            </IonSegment>
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

      <FooterWithButton onClick={onClose}>Close</FooterWithButton>
    </IonModal>
  )
}

export default memo<Props>(
  SuppliersModal,
  (prevProps, nextProps) =>
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.suppliers === nextProps.suppliers
)
