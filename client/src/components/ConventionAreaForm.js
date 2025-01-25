import React, {useState} from "react";

function ConventionAreaForm({ updateConventionAreas }) {
    const [locationName, setLocationName] = useState("");
    const [venue, setVenue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArea = { location_name: locationName, venue: venue};
        
        fetch("/convention_areas", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newArea),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to add convention area");
        })
        .then((data) => {
            updatingConventionAreas(data);
            setLocationName("");
            setVenue("");
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });
    };
}