import React, {useState} from "react";

function AddConventionForm({ areaId, onAddConvention }) {
    const [conventionName, setConventionName] = useState("");
    const [days, setDays] = useState("");
    const [hostCompanyId, setHostCompanyId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('conventions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                convention_name: conventionName,
                days: parseInt(days),
                convention_area_id: parseInt(areaId),
                host_company_id: parseInt(hostCompanyId)
            }),
        })
        .then(response => response.json())
        .then(newConvention => {
            onAddConvention(newConvention);
            setConventionName("");
            setDays("");
            setHostCompanyId("")
        })
        .catch(error => console.error('Error', error));
    };
    
}