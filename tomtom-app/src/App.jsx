import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

import GoThere from './GoThere.jsx'

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

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
    .setLngLat(lngLat)
    .addTo(map)
  }

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng
      }
    }
  }

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 6
  
      }
    })
  }

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
      const destinations = [];
      const origin = {
        lng: lng,
        lat: lat,
      }

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

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
      })
      const callParameters = {
        key: APP_KEY,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      }

    return new Promise((resolve, reject) => {
      ttapi.services
        .matrixRouting(callParameters)
        .then((matrixAPIResults) => {
          console.log("matrixAPIResults", matrixAPIResults);
          const results = matrixAPIResults.matrix[0]
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }
          })
          resultsArray.sort((a, b) => {
            return a.drivingtime - b.drivingtime
          })
          const sortedLocations = resultsArray.map((result) => {
            return result.location
          })
          resolve(sortedLocations)
        })
      })
    }

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services
          .calculateRoute({
            key: APP_KEY,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson()
            drawRoute(geoJson, map)
        })
      })
    }






      document.getElementById("anchorId").addEventListener('click', event => {
          goThere(LONDON_LAT, LONDON_LNG);
        }, false
      );

      map.on('click', (e) => {
        console.log(e);
        destinations.push(e.lngLat);
        addDeliveryMarker(e.lngLat, map);
        recalculateRoutes();
      })

      return () => {
        map.remove()
      }

    }, [lat, lng, zoom] );

  return (
      <div className="app">
        <GoThere />

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
