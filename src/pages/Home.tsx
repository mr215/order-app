import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"; 

import { MainOrderFormValues } from 'types'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { orderStore } = useStores()

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  const handleChange = (value: string) => {
    orderStore.editPickup(value)
  }

  const handleSelect = (value: string) => {
    geocodeByAddress(value)
    .then(res => getLatLng(res[0]))
    .then(latLng => {
      console.log(latLng, value)
    //   props.setLocation({
    //       address: value,
    //       lat: latLng.lat,
    //       lng: latLng.lng
    //     });
      orderStore.editPickup(value)
      
    })
    .catch(error => console.log('error', error))
};

  return (
    <IonPage>
      <Header home />

      <MainOrderForm 
        order={orderStore.order} 
        onSubmit={handleSubmit} 
        onChange={handleChange}
        onSelect={handleSelect}/>
    </IonPage>
  )
}

export default Home
