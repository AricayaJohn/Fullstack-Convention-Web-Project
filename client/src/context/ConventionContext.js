import React, { createContext, useState, useEffect, useCallback } from "react";

export const ConventionContext = createContext();

export function ConventionProvider({ children }) {
    const [conventionAreas, setConventionAreas] = useState([])
    const [conventions, setConventions] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [selectedConventionHosts, setSelectedConventionHosts] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/convention_areas")
            .then(response => response.json())
            .then(data => setConventionAreas(data))
            .catch(error => setError("Error fetching convention areas: " + error.message));
        
        fetch("/conventions")
            .then(response => response.json())
            .then(data => setConventions(data))
            .catch(error => setError("Error fetching conventions: " + error.message));

        fetch("/hosts")
            .then(response => response.json())
            .then(data => setHosts(data))
            .catch(error => setError("Error fetching hosts: " + error.message));
    }, [])

    const updateConventionArea = useCallback(async (id, updatedData) => {
        try {
            const response = await fetch(`/convention_areas/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error("Failed to update convention area");
            const updatedArea = await response.json();

            setConventionAreas((prevAreas) => 
                prevAreas.map((area) => 
                    area.id === id ? updatedArea : area
            )
        );
        return updatedArea;
        } catch (error) {
            setError("Error updating convention area: " + error.message);
            throw error;
        }
    }, []);

}