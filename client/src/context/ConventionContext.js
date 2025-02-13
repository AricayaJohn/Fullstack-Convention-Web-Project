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

    const updateConventionArea = useCallback((id, updatedData) => {
        fetch(`/convention_areas/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
        .then((response) => response.ok ? response.json() : null)
        .then((updatedArea) => {
            if (updatedArea) {
                setConventionAreas((prevAreas) => 
                    prevAreas.map((area) => (area.id === id ? updatedArea : area))
                );
            } else {
                setError("Failed to update convention area");
            }
        })
        .catch(() => {
            setError("Error updating convention area");
        });
    }, [])

    const deleteConventionArea = useCallback((id) => {
        fetch(`/convention_areas/${id}`, { method: "DELETE" })
        .then((response) => {
            if (response.ok) {
                setConventionAreas((prevAreas) => 
                    prevAreas.filter((area) => area.id !== id)
            );
            } else {
                setError("Failed to delete convention area");
            }
        })
        .catch(() => {
            setError("Error deleting convention area");
        });
    }, []);

    const addConventionArea = useCallback((newArea) => {
        fetch(`/convention_areas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArea),
        })
        .then((response) => response.ok ? response.json() : null)
        .then((savedArea) => {
            if (savedArea) {
                setConventionAreas((prevAreas) => [...prevAreas, savedArea]);
            } else {
                setError("Failed to add convention area")
            }
        })
        .catch(() => {
            setError("Failed to add convention area");
        });
    }, []);

    // const fetchConventionById = useCallback((id) => {
    //     fetch(`/conventions/${id}`)
    //         .then((response) => response.ok ? response.json() : null)
    //         .then((data) => {
    //             if (data) {
    //                 setConventions((prev) => 
    //                     prev.map((convention) => (convention.id === id ? data : convention))
    //                 );
    //             } else {
    //                 setError("Failed to fetch convention");
    //             }
    //         })
    //         .catch(() => {
    //             setError("Error fetching convention by ID");
    //         });
    // }, []);

    const HostsByConventionId = useCallback((conventionId) => {
        fetch(`/hosts?convention_id=${conventionId}`)
            .then((response) => response.json())
            .then((data) => setSelectedConventionHosts(data))
            .catch(() => setError("Error fetching hosts for convention"));
    }, []);

    const addHost = useCallback(async (newHost, conventionId) => {
        try {
            const response = await fetch('/hosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHost),
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

    const deleteHost = useCallback(async (id) => {
        try {
            const response = await fetch(`/hosts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Failed to delete host");

            setHosts((prevHosts) => prevHosts.filter((host) => host.id !== id));

            setSelectedConventionHosts((prevSelectedHosts) => 
                prevSelectedHosts.filter((host) => host.id !== id)
            );
        } catch (error) {
            setError("Error deleting host: " + error.message);
            throw error;
        }
    }, [])

    const addConvention = useCallback(async (newConvention) => {
        try {
            const response = await fetch('/conventions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newConvention),
            });
            if (!response.ok) throw new Error("Failed to add convention");
            const savedConvention = await response.json();

            setConventions((prevConventions) => [...prevConventions, savedConvention]);

            return savedConvention;
        } catch (error) {
            setError("Error adding convention: " + error.message);
            throw error;
        }
    }, [])

    const deleteConvention = useCallback(async (id) => {
        try {
            const response = await fetch (`/conventions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Failed to delete convention");

            setConventions((prevConventions) => 
                prevConventions.filter((convention) => convention.id !== id)
            );
        } catch (error) {
            setError("Error deleting convention:" + error.message);
            throw error;
        }
    }, []);

    const updatedConvention = useCallback(async (id, updatedData) => {
        try {
            const response = await fetch(`/conventions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error("Failed to update convention");
            const updatedConvention = await response.json();

            setConventions((prevConventions) =>
                prevConventions.map((convention) => 
                    convention.id === id ? updatedConvention : convention
                )
            );
            return updatedConvention;
        } catch (error) {
            setError("Error updating convention: " + error.message);
            throw error;
        }
    }, [])

        return (
            <ConventionContext.Provider
                value={{
                    conventionAreas,
                    conventions,
                    hosts,
                    selectedConventionHosts,
                    updateConventionArea,
                    addConventionArea,
                    deleteConventionArea,
                    // fetchConventionById,
                    HostsByConventionId,
                    addHost,
                    deleteHost,
                    addConvention,
                    updatedConvention,
                    deleteConvention,
                    error,
                }}
            >
                {children}
            </ConventionContext.Provider>
        );
}