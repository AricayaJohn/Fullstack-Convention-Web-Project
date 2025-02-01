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
                prevAreas.map((area) => (area.id === id ? updatedArea : area))
              );
            return updatedArea;
        } catch (error) {
            setError("Error updating convention area: " + error.message);
            throw error;
        }
    }, []);

    const deleteConventionArea = useCallback(async(id) => {
        try {
            const response = await fetch(`/convention_areas/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete convention area");

            setConventionAreas((prevAreas) => 
                prevAreas.filter((area) => area.id !== id)
            );
        } catch (error) {
            setError("Error deleting convention area: " + error.message);
            throw error;
        }
    }, []);

    const addConventionArea = useCallback(async (newArea) => {
        try{
            const response = await fetch('/convention_areas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArea),
            });
            if (!response.ok) throw new Error("Failed to add convention area");
            const savedArea = await response.json();
            setConventionAreas((prevAreas) => [...prevAreas, savedArea]);

            return savedArea;
        } catch (error) {
            setError("Error adding convention area: " + error.message);
            throw error
        }
    }, [])

    const fetchConventionById = useCallback( async (id) => {
        try {
            const response = await fetch(`/conventions/${id}`);
            if (!response.ok) throw new Error("Failed to fetch convention");
            const data = await response.json();
            setConventions((prev) => 
                prev.map((convention) => (convention.id === id ? data : convention))
        );
        return data;
        } catch (error) {
            setError("Error fetching convention by ID: " + error.message);
            throw error;
        }
    }, [])

    const fetchHostsByConventionId = useCallback(async (conventionId) => {
        try{
            const response = await fetch (`/hosts?convention_id=${conventionId}`);
            if(!response.ok) throw new Error("Failed to fetch hosts");
            const data = await response.json();
            setSelectedConventionHosts(data);
            return data;
        } catch (error) {
            setError("Error fetching hosts for convention: " + error.message);
            throw error;
        }
    }, [])

    const AddHost = useCallback(async (newHost, conventionId) => {
        try {
            const response = await fetch('/hosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newhost),
            });
            if (!response.ok) throw new Error("Failed to add host");
            const savedHost = await response.json();

            setHosts((prevHosts) => [...prevHosts, savedHost]);

            if(savedHost.convention_id === parseInt(conventionId)) {
                setSelectedConventionHosts((prevSelectedHosts) => [...prevSelectedHosts, savedHost]);
            }
            return savedHost;
        } catch (error) {
            setError("Error adding host: " + error.message);
            throw error;
        }
    }, [])
}