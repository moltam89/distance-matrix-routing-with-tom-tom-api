import { useState } from 'react';
import LatLongValidatedInput from './LatLongValidatedInput.jsx'

const GoThere = ({goThere}) => {

  const [lat, setLat] = useState({});
  const [lng, setLng] = useState({});

  const go = () => {
    goThere(lat, lng);
  }

  const setLatValidatedInput = (value) => {
    setLat(value);
  }

  const setLngValidatedInput = (value) => {
    setLng(value);
  }


	return (
		<div>
      <LatLongValidatedInput 
          placeholder ={"Latitude"}
          parentComponentFunction ={setLatValidatedInput}
       />

      <LatLongValidatedInput 
          placeholder ={"Longtitude"}
          parentComponentFunction ={setLngValidatedInput}
       />

      <button onClick={go}>
        Go!
      </button>
		</div>

	);
}

export default GoThere;