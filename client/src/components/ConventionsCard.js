import React, {useState} from "react";
import {Link} from "react-router-dom";

function ConventionCard({convention, onUpdate, onDelete}) {
    const [conventionName, setConventionName] = useState(convention.convention_name);
    const [days, setDays] = useState(convention.days);
    cosnt [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        fetch(`/conventions/${convention.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                onDelete(convention.id);
            } else {
                throw new Error("Failed to delete convention");
            }
        })
        .catch(error => console.error('Error:', error));
    };
    const handleUpdate = () => {
        const updatedData = { convention_name: conventionName, days: parseInt(days)};
        const fetch(`/conventions/${convention.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(updatedConvention => {
            onUpdate(updatedConvention);
            setIsEditing(false);
        }) 
        .catch(error => console.error('Error', error));
    };

    return (
        <div>
            
        </div>
    )
}
