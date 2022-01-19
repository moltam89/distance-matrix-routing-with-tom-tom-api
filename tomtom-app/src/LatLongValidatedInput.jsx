import { validationLatitudeLongitude } from "validation-latitude-longitude";

const LatLongValidatedInput = ({parentComponentFunction, placeholder}) => {

  const validateLatLong = (e) => {
    let value = e.target.value;

    if (validationLatitudeLongitude.latLong(value, value)) {
      parentComponentFunction(value);
    }
    else {
      console.log("Lat/long is not validdd");
    }
  }

	return (
		<div>
			<input onChange={validateLatLong} placeholder={placeholder ? placeholder : ""} type="text"/>
		</div>
	);
}

export default LatLongValidatedInput;