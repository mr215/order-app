import React, { useState, useEffect, useRef } from "react";
import { IonInput } from '@ionic/react'

let autoComplete: any;

function loadScript (url: string, callback: () => void) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  // if (script.readyState) { // only required for IE <9
  //   script.onreadystatechange = function() { 
  //     if (script.readyState === "loaded" || script.readyState === "complete") {
  //       script.onreadystatechange = null
  //       callback()
  //     }
  //   }
  // } else { //others
  //   script.onload = () => callback();
  // }
  script.onload = () => callback();

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function handleScriptLoad(updateQuery: (value: string) => void, autoCompleteRef: any) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery: (value: string) => void ) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function AutocompleteInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPeATH8pRaEKdRvlyGo1LUF4zKDm0HBZU&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

export default AutocompleteInput;