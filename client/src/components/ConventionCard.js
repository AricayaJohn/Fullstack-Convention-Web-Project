import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";

function ConventionCard({convention}) {
    const [conventionName, setConventionName] = useState(convention.convention_name);
    const [days, setDays] = useState(convention.days);
    const [isEditing, setIsEditing] = useState(false);

    const { updatedConvention, deleteConvention } = useContext(ConventionContext);

    const handleDelete = () => {
        deleteConvention(convention.id);
    };

    const handleUpdate = () => {
        const updatedData = { convention_name: conventionName, days: parseInt(days) };
        updatedConvention(convention.id, updatedData);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text"
                        value={conventionName}
                        onChange={(e)=>setConventionName(e.target.value)}
                    />
                    <input 
                        type="number"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{convention.convention_name}</h2>
                    <p>Days: {convention.days}</p>
                    <Link to={`/hosts/${convention.id}`}>
                        View Hosts
                    </Link>
                    <br />
                    <button onClick={() => setIsEditing(true)}>Edit Convention</button>
                    <button onClick={handleDelete}>Delete Convention</button>
                </div>
            )}
        </div>
    );
}
export default ConventionCard;
