import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

let APP_KEY = "3ovwP0g2CzgNMyc7QtYqn6JuOHtaESTC";

const App = () => {
  const [map, setMap] = useState({});
  const [lat, setLat] = useState("47.4979");
  const [lng, setLng] = useState("19.0402");

  const mapElement = useRef();
  const latElement = useRef();
  const lngElement = useRef();

  const goThere = () => {
      let currentLat = latElement.current.value
      let currentLng = lngElement.current.value

      if (currentLat && currentLng) {
        setLat(currentLat);
        setLng(currentLng);
      }
  }

  useEffect(() => {
      let map = tt.map({
        key: APP_KEY,
        container: mapElement.current,
        stylesVisibility: {
          trafficIncidents: true,
          trafficFlow: true,
        },
        zoom: 8,
        center: {lat, lng}, 
      }); 

      setMap(map);

      const addMarker = () => {
        const element = document.createElement('div')
        element.className = 'marker'

        const marker = new tt.Marker({
          draggable: true,
          element: element,
        })
          .setLngLat([lng, lat])
          .addTo(map)
        
        marker.on('dragend', () => {
          const lngLat = marker.getLngLat()
          setLng(lngLat.lng)
          setLat(lngLat.lat)
        })
      }
      addMarker();

      return () => {
        map.remove()
      }

    }, [lat, lng] );

  return (
      <div className="app">
        <input ref={latElement} id="lat" placeholder="latitude" type="text" data-id="latitude"/>
        <input ref={lngElement} id="lng" placeholder="longitude" type="text" data-id="longitude"/>
        <button onClick={goThere}>
          Go!
        </button>

        <div ref={mapElement} className="map"> </div>
      </div> 
  );
}

export default App;
