import React from 'react'
import PlacesAutocomplete from "react-places-autocomplete";
import { Order } from 'types'
import { observer } from "mobx-react"

interface AutocompleteInputProps {
    order: Order,
    onChange: (value: string) => void
    onSelect: (value: string) => void
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = observer(({ order, onChange, onSelect }) => {
    
    return (
      <PlacesAutocomplete
        value={order.pickupAddress}
        onChange={onChange}
        onSelect={onSelect}
        > 
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input { ...getInputProps({ placeholder: "Type address" })}/>
  
            <div>
              {loading ? <div> ...loading </div> : null}
  
              {suggestions.map( suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "yellow" : "black"
                };
  
                return (
                    <div
                    {...getSuggestionItemProps(suggestion, {style})}
                    key={suggestion.placeId}>
                        {suggestion.description}
                    </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
})

export default AutocompleteInput