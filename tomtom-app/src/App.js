import './App.css'
import * as tt from '@tomtom-international/web-sdk-maps';
import {useEffect, useState, useRef} from "react";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

let APP_KEY = "3ovwP0g2CzgNMyc7QtYqn6JuOHtaESTC";

const App = () => {
  const [map, setMap] = useState({});
  const mapElement = useRef();

  useEffect(() => {
        let map = tt.map({
              key: APP_KEY,
              container: mapElement.current,
              stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
              },
              zoom: 14
            });
      setMap(map);
    }, [] );

  return (
    <div className="App">
      <div ref={mapElement} className="map">
      </div>
    </div>
  );
}

export default App;
