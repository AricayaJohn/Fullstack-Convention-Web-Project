import React, {useState} from "react";
import {Link} from "react-router-dom";

function ConventionAreaCard({ area, onUpdate, onDelete}) {
    const [locationName, setLocationName] = useState(area.locationName);
    const [venue, setVenue] = useState(area.venue);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        fetch(`/convention_areas/${area.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                onDelete(area.id);
            } else {
                throw new Error("Failed to delete convention area");
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
}