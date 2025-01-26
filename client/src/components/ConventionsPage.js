import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

function ConventionPage() {
    const [conventions, setConventions] = useState([]);
    const [areaName, setAreaName] = useState("");
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("pending");
    const {areaId} = useParams();

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
    }, [areaId])
}