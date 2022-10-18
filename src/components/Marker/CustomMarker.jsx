import { Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

// create a marker component that customizes the fountain markers.
function CustomMarker() {
    // import fountain data from redux.
    const fountains = useSelector(store => store.fountainReducer);

    // the config for the marker icon property.
    const customIcon = {
        url: '/svg/df.svg',
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15)
    }

    return (
        <>
        {fountains.map(ftn => (
            <Marker
                key={ftn.id}
                position={{lat: Number(ftn.latitude), lng: Number(ftn.longitude)}}
                icon={customIcon}
            >

            </Marker>
        ))}
        </>
    );
}

export default CustomMarker;