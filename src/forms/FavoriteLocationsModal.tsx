import React, { useState } from 'react'
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
import { withFormik, FormikProps, FormikBag, FieldArray } from 'formik'
import styled from 'styled-components'

import { star, starOutline } from 'ionicons/icons'
import useStores from 'hooks/useStores'
import { User, LocationFormValues, Location, DEFAULT_LOCATION } from 'types'
import AddLocationModalForm from './AddLocationModalForm'
import SupplierSelectionModal from './SupplierSelectionModal'

interface Props {
  user: User
  onCancel: () => void
  onClick: (address: string) => void
  onSubmit: (values: LocationFormValues) => void
}

const InfoDiv = styled.div`
  font-size: 1.25rem;
  margin: 0.5rem;
`

const FavoriteLocationsModal: React.FC<
  Props & FormikProps<LocationFormValues>
> = ({
  user,
  values,
  setFieldValue,
  onCancel,
  onClick,
  submitForm,
  onSubmit,
}) => {
  const { userStore } = useStores()
  const favLocations = userStore.user.favoriteLocations

  const [favorites, setFavorites] = useState(userStore.user.favoriteLocations)
  const [showAddLocationForm, setShowAddLocationForm] = useState<boolean>(false)
  const [showSuppliers, setShowSuppliers] = useState<boolean>(false)

  const handleAddLocation = (newLocation: Location) => {
    setFieldValue('favoriteLocations', [...favorites, newLocation])
    setFavorites([...favorites, newLocation])
    submitForm()
    setShowAddLocationForm(false)
  }

  const handleRefavoriteLocation = (location: Location) => {
    let updatedFavorites = [...favorites, location]
    setFavorites(updatedFavorites)
  }

  const handleRemoveLocation = (location: Location) => {
    let index = favorites.indexOf(location)
    let updatedLocations = favorites
      .slice(0, index)
      .concat(favLocations.slice(index + 1))
    setFavorites(updatedLocations)
  }

  const handleModalSubmit = () => {
    setFieldValue('favoriteLocations', favorites)
    onSubmit({ favoriteLocations: favorites })
    onCancel()
  }

  const renderFavorites = () => {
    return (
      <>
        <FieldArray
          name="favoriteLocations"
          render={helpers => (
            <>
              {values.favoriteLocations.map(
                (location: Location, index: number) => (
                  <IonRow key={`${location}-${index}`}>
                    <IonItem lines="inset">
                      {favorites.find(loc => loc.name === location.name) ? (
                        <IonIcon
                          icon={star}
                          onClick={() => handleRemoveLocation(location)}
                        />
                      ) : (
                        <IonIcon
                          icon={starOutline}
                          onClick={() => handleRefavoriteLocation(location)}
                        />
                      )}

                      <IonCol onClick={() => onClick(location.address)}>
                        <InfoDiv>
                          <IonRow>{location.name}</IonRow>
                          <IonRow>{location.address}</IonRow>
                        </InfoDiv>
                      </IonCol>
                    </IonItem>
                  </IonRow>
                )
              )}
            </>
          )}
        />
        <IonItem lines="none">
          <IonRouterLink onClick={() => setShowAddLocationForm(true)}>
            + Add Another Location
          </IonRouterLink>
        </IonItem>
      </>
    )
  }

  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Locations</IonLabel>
          </IonListHeader>

          <IonItem lines="none">
            <IonRouterLink onClick={() => setShowSuppliers(true)}>
              View Suppliers
            </IonRouterLink>
          </IonItem>

          <IonGrid>
            {!showSuppliers ? (
              renderFavorites()
            ) : (
              <SupplierSelectionModal
                user={user}
                onSubmit={onSubmit}
                onCancel={onCancel}
                onClick={onClick}
              />
            )}
          </IonGrid>
        </IonList>
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
        <IonButton expand="block" onClick={handleModalSubmit}>
          Close
        </IonButton>
      </IonFooter>

      {showAddLocationForm && (
        <AddLocationModalForm
          location={DEFAULT_LOCATION}
          onSubmit={handleAddLocation}
          onCancel={() => setShowAddLocationForm(false)}
        />
      )}
    </IonModal>
  )
}

export default withFormik<Props, LocationFormValues>({
  displayName: 'FavoriteLocationsForm',
  enableReinitialize: true,

  mapPropsToValues({ user }: Props): LocationFormValues {
    return user as LocationFormValues
  },

  handleSubmit(
    values: LocationFormValues,
    { props: { onSubmit }, setSubmitting }: FormikBag<Props, LocationFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(FavoriteLocationsModal)
