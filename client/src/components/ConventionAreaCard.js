import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";

function ConventionAreaCard({ area }) {
    const [locationName, setLocationName] = useState(area.location_name);
    const [venue, setVenue] = useState(area.venue);
    const [isEditing, setIsEditing] = useState(false);

    const {updateConventionArea, deleteConventionArea} = useContext(ConventionContext)

    const handleDelete = async () => {
        try {
            await deleteConventionArea(area.id);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleUpdate = async () => {
        const updatedData = { location_name: locationName, venue: venue};
        try {
            await updateConventionArea(area.id, updatedData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type = "text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                    <input 
                        type = "text"
                        value={venue}
                        onChange={(e)=> setVenue(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{area.location_name}</h2>
                    <p>{area.venue}</p>
                    <Link to={`/conventions/${area.id}`}>
                        View Conventions in {area.location_name}
                    </Link>
                    <br/>
                    <button onClick={() => setIsEditing(true)}> Edit Area</button>
                    <button onClick={(handleDelete)}>Delete Area</button>
                </div>
            )}
        </div>
    );
}

export default ConventionAreaCard;