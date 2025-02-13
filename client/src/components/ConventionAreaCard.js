import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";

function ConventionAreaCard({ area }) {
    const [locationName, setLocationName] = useState(area.location_name);
    const [venue, setVenue] = useState(area.venue);
    const [isEditing, setIsEditing] = useState(false);

    const {updateConventionArea, deleteConventionArea} = useContext(ConventionContext)

    const handleDelete = () => {
        deleteConventionArea(area.id);
    };

    const handleUpdate = () => {
        const updatedData = { location_name: locationName, venue: venue};
        updateConventionArea(area.id, updatedData);
        setIsEditing(false)
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
                    <br /> 
                    <Link to={`/hosts_in_area/${area.id}`}>
                        View Host in {area.location_name}
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