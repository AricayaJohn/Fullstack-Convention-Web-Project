import React, {useState} from "react";

function AddHostForm({ conventionId, onAddHost }) {
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/hosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                industry,
                convention_id: parseInt(conventionId)
            }),
        })
        .then(response => response.json())
        .then(newHost => {
            onAddHost(newHost);
            setName("");
            setIndustry("");
        })
        .catch(error => console.error('Error:', error));
    };
}