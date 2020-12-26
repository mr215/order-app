import React, { memo, useState } from 'react'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

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

  const renderDirectionsService = () => {
    if (!origin || !destination || directions) {
      return
    }

    return (
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }}
        callback={directionsServiceCallback}
      />
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '60%',
        width: '75%',
        margin: '1rem auto',
      }}
    >
      {renderDirectionsService()}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
}

export default memo(
  DirectionsMap,
  (prevProps, nextProps) =>
    prevProps.origin === nextProps.origin &&
    prevProps.destination === nextProps.destination
)
