import { Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

// create a marker component that customizes the fountain markers.
function CustomMarker() {
    // import fountain data from redux.
    const fountains = useSelector(store => store.fountainReducer);


    return (
        <>
        {fountains.map(ftn => (
            <Marker
                key={ftn.id}
                position={{lat: Number(ftn.latitude), lng: Number(ftn.longitude)}}
                
            >

            </Marker>
        ))}
        </>
    );
}

export default CustomMarker;