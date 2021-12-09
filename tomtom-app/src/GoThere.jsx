import { useRef } from 'react'

const GoThere = ({goThere}) => {

  const latElement = useRef();
  const lngElement = useRef();

  const go = () => {
    goThere(latElement.current.value, lngElement.current.value);
  }

	return (
		<div>
			<input ref={latElement} id="lat" placeholder="latitude" type="text" data-id="latitude"/>
        <input ref={lngElement} id="lng" placeholder="longitude" type="text" data-id="longitude"/>
        <button onClick={go}>
          Go!
        </button>
		</div>

	);
}

export default GoThere;