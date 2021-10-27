import './App.css'
import * as tt from '@tomtom-international/web-sdk-maps';
import {useEffect, useState, useRef} from "react";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

let APP_KEY = "3ovwP0g2CzgNMyc7QtYqn6JuOHtaESTC";

const App = () => {
  const [map, setMap] = useState({});
  const [lat, setLat] = useState("37.336634");
  const [lng, setLng] = useState("-121.891623");

  const mapElement = useRef();

  const goThere = (e) => {
      if (e.target.dataset.id === "latitude") {
        setLat(e.target.value);
      }
      else {
        setLng(e.target.value);
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
            zoom: 5,
            center: {lat, lng}, 
          });
      setMap(map);
    }, [lat, lng] );

  return (
    <div className="App">
      <input id="lat" placeholder="latitude" type="text" data-id="latitude" onChange={goThere} />
      <input id="lng" placeholder="longitude" type="text" data-id="longitude" onChange={goThere} />
      <div ref={mapElement} className="map">
      </div>
    </div>
  );
}

export default App;
