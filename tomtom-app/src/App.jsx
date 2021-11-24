import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

let APP_KEY = "3ovwP0g2CzgNMyc7QtYqn6JuOHtaESTC";

const BUDAPEST_LAT = "47.4979";
const BUDAPEST_LNG = "19.0402";

const LONDON_LAT = "51.5072";
const LONDON_LNG = "0.1276";

const App = () => {
  const [map, setMap] = useState({});
  const [zoom, setZoom] = useState(8);

  const [lat, setLat] = useState(BUDAPEST_LAT);
  const [lng, setLng] = useState(BUDAPEST_LNG);

  const mapElement = useRef();
  const latElement = useRef();
  const lngElement = useRef();

  const goThere = (currentLat, currentLng) => {
      if (!currentLat && !currentLng) {
        currentLat = latElement.current.value
        currentLng = lngElement.current.value
      }

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
        zoom: zoom,
        center: {lat, lng}, 
      }); 

      setMap(map);



      const addMarker = () => {
        const popupOffsets = {bottom: [0, -50]};

        const popupHTML = '<a id=anchorId href="#" >Go to London!</a>';

        const popup = new tt.Popup({offset: popupOffsets}).setHTML(popupHTML);

        const element = document.createElement('div')
        element.className = 'marker'

        const marker = new tt.Marker({
          draggable: true,
          element: element,
        })
          .setLngLat([lng, lat])
          .addTo(map)
        
        marker.on('dragend', () => {
          const lngLat = marker.getLngLat();
          setLng(lngLat.lng);
          setLat(lngLat.lat);
          setZoom(map.getZoom());
        })

        marker.setPopup(popup).togglePopup();

      }
      addMarker();

      document.getElementById("anchorId").addEventListener('click', event => {
          goThere(LONDON_LAT, LONDON_LNG);
        }, false
      );

      return () => {
        map.remove()
      }

    }, [lat, lng, zoom] );

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
