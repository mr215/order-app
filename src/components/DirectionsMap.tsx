import React, { memo, useState } from 'react'
import {
  GoogleMap,
  GoogleMapProps,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

const DEFAULT_CENTER = {
  lat: 37.77,
  lng: -122.42,
}

type Props = Pick<GoogleMapProps, 'center' | 'zoom'> &
  google.maps.DirectionsRequest

const DirectionsMap: React.FC<Props> = ({
  center = DEFAULT_CENTER,
  zoom = 10,
  origin,
  destination,
}) => {
  const [
    directions,
    setDirections,
  ] = useState<google.maps.DirectionsResult | null>(null)
  const [error, setError] = useState<google.maps.DirectionsStatus | null>(null)

  const directionsServiceCallback = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setDirections(result)
    } else {
      setError(status)
    }
  }

  const renderDirectionsService = () => {
    if (error) {
      return
    }

    if (!origin || !destination || directions) {
      return
    }

    return (
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
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
      center={center}
      zoom={zoom}
    >
      {renderDirectionsService()}

      {directions && <DirectionsRenderer options={{ directions }} />}
    </GoogleMap>
  )
}

export default memo(
  DirectionsMap,
  (prevProps, nextProps) =>
    prevProps.origin === nextProps.origin &&
    prevProps.destination === nextProps.destination
)