import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import debounce from 'lodash/debounce'

import { fetchSuppliers as fetchSuppliersApi } from 'utils/api'
import FooterWithButton from 'components/FooterWithButton'
import { SupplierEntity } from 'types'

const SUPPLIER_TYPES = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'lumber',
    label: 'Lumber',
  },
  {
    value: 'hardware',
    label: 'Hardware',
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
  },
  {
    value: 'electric',
    label: 'Electric',
  },
  {
    value: 'paint',
    label: 'Paint',
  },
  {
    value: 'other',
    label: 'Other',
  },
]

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

  const [storeType, setStoreType] = useState('')
  const [query, setQuery] = useState('')
  const queryRef = useRef<HTMLIonInputElement>(null)

  const focusQueryInput = useCallback(
    debounce(() => queryRef.current!.setFocus(), 300),
    []
  )

  const fetchSuppliers = useCallback(
    debounce(async (params?: any) => {
      try {
        setIsLoading(true)

        const { data } = await fetchSuppliersApi(params)

        setSuppliers(data as SupplierEntity[])
      } catch (e) {
        console.log('Error in loading suppliers')
      } finally {
        setIsLoading(false)
      }
    }, 500),
    []
  )

  // Fetch suppliers when store type changes
  useEffect(() => {
    const params = storeType === '' ? {} : { store_type: storeType }

    fetchSuppliers(params)
  }, [storeType])

  // Fetch suppliers when query changes
  useEffect(() => {
    if (query.length >= 3) {
      fetchSuppliers({ q: query })
    }
  }, [query])

  // Focus query input when reloading the suppliers
  useEffect(() => {
    if (queryRef.current) {
      focusQueryInput()
    }
  }, [showSearch, suppliers])

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
                ref={queryRef}
                type="text"
                placeholder="Enter Supplier Name"
                value={query}
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
              {SUPPLIER_TYPES.map(({ value, label }) => (
                <StyledIonSegmentButton key={value} value={value}>
                  <IonLabel>{label}</IonLabel>
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
              <LogoImg
                slot="start"
                src={attributes.logo}
                alt={attributes.store_name}
                width={150}
              />

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
