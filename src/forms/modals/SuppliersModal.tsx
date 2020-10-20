import React, { useState, useMemo } from 'react'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonModal,
  IonRouterLink,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react'
import styled from 'styled-components'
import { search, close } from 'ionicons/icons'

import useDebouncedEffect from 'hooks/useDebouncedEffect'
import { fetchSuppliers as fetchSuppliersApi } from 'utils/api'
import FooterWithButton from 'components/FooterWithButton'
import { SupplierEntity } from 'types'

const SUPPLIER_TYPES: Record<string, string> = {
  all: 'All',
  lumber: 'Lumber',
  hardware: 'Hardware',
  plumbing: 'Plumbing',
  electric: 'Electric',
  paint: 'Paint',
  other: 'Other',
}

interface Props {
  isOpen: boolean
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

const SuppliersModal: React.FC<Props> = ({ isOpen, onSelect, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([])
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [storeType, setStoreType] = useState('all')
  const [query, setQuery] = useState('')
  const params = useMemo(() => {
    if (showSearch) {
      return { q: query }
    }

    return storeType === 'all' ? {} : { store_type: storeType }
  }, [showSearch, storeType, query])

  useDebouncedEffect(
    () => {
      const fetchSuppliers = async () => {
        try {
          setIsLoading(true)

          const { data } = await fetchSuppliersApi(params)

          setSuppliers(data as SupplierEntity[])
        } catch (e) {
          console.log('Error in loading suppliers')
        } finally {
          setIsLoading(false)
        }
      }

      fetchSuppliers()
    },
    500,
    [params]
  )

  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={onClose}>
      <IonContent>
        <IonLoading isOpen={isLoading} />

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
              value={storeType}
              onIonChange={e => setStoreType(e.detail.value!)}
            >
              {Object.keys(SUPPLIER_TYPES).map(type => (
                <StyledIonSegmentButton key={type} value={type}>
                  <IonLabel>{SUPPLIER_TYPES[type]}</IonLabel>
                </StyledIonSegmentButton>
              ))}
            </IonSegment>
          )}

          {suppliers.map(({ id, attributes }) => (
            <IonItem
              key={id}
              button
              lines="full"
              onClick={() => onSelect(attributes.address)}
            >
              {/* <LogoImg
                slot="start"
                src={attributes.logo}
                alt={attributes.store_name}
                width={150}
              /> */}

              <IonLabel className="ion-text-wrap">
                <h2>{attributes.store_name}</h2>
                <p>{attributes.address}</p>
                <h2>
                  <IonRouterLink
                    href={`tel:${attributes.phone}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {attributes.phone}
                  </IonRouterLink>
                </h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <FooterWithButton onClick={onClose}>Close</FooterWithButton>
    </IonModal>
  )
}

export default SuppliersModal
