import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ConventionsPage() {
    const [conventions, setConventions] = useState([]);
    const [areaName, setAreaName] = useState("");
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("pending");
    const { areaId } = useParams();

    useEffect(() => {
        fetch(`/convention_areas/${areaId}`)
        .then((response) => response.json())
        .then((data) => {
            setAreaName(data.location_name);
        })
        .catch((err) => {
            console.error('Error fetching area details:', err);
            setError('Failed to load area details');
        });

        fetch(`/convention?convention_area_id=${areaId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch conventions");
            }
        })
        .then((data) => {
            setConventions(data);
            setStatus("resolved");
        })
        .catch((err) => {
            console.error('Error fetching conventions:', err);
            setError(err.message);
            setStatus("rejected");
        });
    }, [areaId]);

    // const handleAddConvention = (newConvention) => {
    //     setConventions((prevConventions) => [...prevConventions, newConvention]);
    // };

    const handleDeleteConvention = (id) => {
        setConventions((prevConventions) => prevConventions.filter(convention => convention.id !== id));
    };

    const handleUpdateConvention = (updatedConvention) => {
        setConventions((prevConventions) => prevConventions.map(convention => convention.id === updatedConvention.id ? updatedConvetnion : convention));
    };

    if (status === "pending") return <h2>Loading...</h2>
    if (status === "rejected") return <h2> Error: {error}</h2>

    return (
        <div>
            <h1> Conventions in {areaName}</h1>
            {conventions.length > 0 ? (
                conventions.map((convention) => (
                    <ConventionCard 
                    key={convention.id}
                    convention={convention}
                    onDelete={handleDeleteConvention}
                    onUpdate={handleUpdateConvention}
                    />
                ))
            ) : (
                <p>No Conventions found for this area.</p>
            )}
        </div>
    );
}

export default ConventionsPage;