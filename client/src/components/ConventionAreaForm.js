import React, {useState, useContext} from "react";
import { ConventionContext } from "../context/ConventionContext";

function ConventionAreaForm() {
    const [locationName, setLocationName] = useState("");
    const [venue, setVenue] = useState("");

    const { addConventionArea } = useContext(ConventionContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArea = { location_name: locationName, venue: venue};
        
        addConventionArea(newArea);
        setLocationName("");
        setVenue("");
    };

    return (
        <div>
            <h1>Add Convention Area</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Location Name:
                    <input 
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Venue:
                    <input 
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ConventionAreaForm;