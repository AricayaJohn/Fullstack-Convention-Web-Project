import React, {useState, useContext} from "react";
import { ConventionContext } from "../context/ConventionContext";

function ConventionAreaForm() {
    const [locationName, setLocationName] = useState("");
    const [venue, setVenue] = useState("");

    const { addConventionArea } = useContext(ConventionContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newArea = { location_name: locationName, venue: venue};
        
        try {
            await addConventionArea(newArea);
            setLocationName("");
            setVenue("");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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