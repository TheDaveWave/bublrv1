import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FountainsListItem from "./FountainsListItem";

function FountainsPage() {
    // access the list of fountains to display on the dom.
    const fountains = useSelector(store => store.fountains.fountainsReducer);
    // access useDispatch()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'GET_FOUNTAINS'});
    }, []);

    return (
        <main>
            {fountains.map(ftn => (
                <FountainsListItem key={ftn.id} fountain={ftn}/>
            ))}
        </main>
    );
}

export default FountainsPage;