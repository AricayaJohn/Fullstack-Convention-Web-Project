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

    const handleUpdate = () => {
        const updatedData = { location_name: locationName, venue: venue};
        fetch(`/convention_areas/${area.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(updatedArea => {
            onUpdate(updatedArea);
            setIsEditing(false);
        })
        .catch(error => console.error('Error', error));
    };

    
}