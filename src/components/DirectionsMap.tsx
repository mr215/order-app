import React, { useState } from 'react'
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

import { METERS_PER_MILE } from 'utils/config'

type Props = google.maps.DirectionsRequest & {
  callback: (miles: number) => void
}

const DirectionsMap: React.FC<Props> = ({ origin, destination, callback }) => {
  const [
    directions,
    setDirections,
  ] = useState<google.maps.DirectionsResult | null>(null)

  const directionsServiceCallback = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setDirections(result)

      const miles = result.routes[0].legs[0].distance.value / METERS_PER_MILE

      callback(miles)
    } else {
      console.log('DirectionsService error', result)
    }
  }

  return (
    <>
      {origin && destination && !directions && (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          }}
          callback={directionsServiceCallback}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </>
  )
}

export default DirectionsMap
