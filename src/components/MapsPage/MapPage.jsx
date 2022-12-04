import { useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import Map from "../Map/Map";

// component to display the map page.
function MapPage() {

    // extract isLoaded key from useLoadScript
    const { isLoaded } = useLoadScript({
        // access the google maps API key, put key in this string.
        googleMapsApiKey: '',
    });

    return (
        <main>
            {isLoaded ? <Map /> : <div>Loading...</div>}
        </main>
    );
}

export default MapPage;