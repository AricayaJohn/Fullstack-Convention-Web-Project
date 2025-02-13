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

    const addHost = useCallback((newHost, conventionId) => {
        fetch('/hosts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHost),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                setError("Error adding host");
            }
        })
        .then((savedHost) => {
            if (savedHost) {
                setHosts((prevHosts) => [...prevHosts, savedHost]);
                if (savedHost.convention_id === parseInt(conventionId)) {
                    setSelectedConventionHosts((prevSelectedHosts) => [...prevSelectedHosts, savedHost]);
                }
            }
        })
        .catch(() => setError("Error adding host"));
    }, [])

    const deleteHost = useCallback((id) => {
        fetch(`/hosts/${id}`, { method: 'DELETE'})
            .then((response) => {
                if (response) {
                    setHosts((prevHosts) => prevHosts.filter((host) => host.id !== id));
                    setSelectedConventionHosts((prevSelectedHosts) => 
                        prevSelectedHosts.filter((host) => host.id !== id)
                    );
                } else {
                    setError("Failed to delete host");
                }
            })
            .catch(() => setError("Error deleting host"));
    }, []);

    const addConvention = useCallback((newConvention) => {
        fetch('/conventions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newConvention),
        })
        .then((response) => {
            if (!response.ok) {
                setError("Failed to add convention");
                return null;
            }
            return response.json();
        })
        .then((savedConvention) => {
            if (savedConvention) {
                setConventions((prevConventions) => [...prevConventions, savedConvention]);
            }
        })
        .catch(() => setError("Error adding convention"));
    }, [])

    const deleteConvention = useCallback((id) => {
        fetch(`/conventions/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    setConventions((prevConventions) => 
                        prevConventions.filter((convention) => convention.id !== id)
                    );
                } else {
                    setError("Failed to delete convention");
                }
            })
            .catch(() => setError("Error deleting convention"));
    }, []);

    const updatedConvention = useCallback((id, updatedData) => {
        fetch(`/conventions/${id}`, {
            method: 'PATCH',
            haeders: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
        .then((response) => {
            if (!response.ok) {
                setError("Failed to update convention");
                return;
            }
            return response.json();
        })
        .then((updatedConvention) => {
            if (updatedConvention) {
                setConventions((prevConventions) => 
                    prevConventions.map((convention) => 
                        convention.id === id ? updatedConvention: convention
                    )
                )
            }
        })
        .catch(() => setError("Error updating convention"))
    }, [])

    const HostsByAreaId = useCallback((areaId) => {
        return fetch(`/hosts_by_area/${areaId}`)
        .then((response) => {
            if (!response.ok) {
                setError("Failed to fetch hosts by area");
                return null;
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error fetching hosts by area:", error);
            return null;
        });
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
                    HostsByAreaId,
                    updatedConvention,
                    deleteConvention,
                    error,
                }}
            >
                {children}
            </ConventionContext.Provider>
        );
}