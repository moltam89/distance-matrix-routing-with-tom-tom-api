const LatLongValidatedInput = ({parentComponentFunction, placeholder}) => {

	return (
		<div>
			<input onChange={parentComponentFunction} placeholder={placeholder ? placeholder : ""} type="text"/>
		</div>
	);
}

export default LatLongValidatedInput;