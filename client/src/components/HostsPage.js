import React, { useEffect, useState, useContext } from "react";
import {useParams, Link } from "react-router-dom";
import AddHostForm from "./AddHostForm";
import { ConventionContext } from "../context/ConventionContext";

function HostsPage(){
    const {conventionId} = useParams();
    const {
        selectedConventionHosts,
        fetchHostsByConventionId,
        deleteHost,
        addHost, } = useContext(ConventionContext);
    const [status, setStatus] = useState("pending");
    const [pageError, setPageError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchHostsByConventionId(conventionId);
                setStatus("resolved")
            } catch (err) {
                console.error("Error fetching data: ", err);
                setPageError("Failed to load data");
                setStatus("rejected")
            }
        };
        loadData();
    }, [conventionId, fetchHostsByConventionId]);


    const handleAddHost = async (newHost) => {
        try {
            await addHost(newHost, conventionId);
            await fetchHostsByConventionId(conventionId);
        } catch (error) {
            console.error("Error adding host: ", error);
            setPageError("Failed to add host");
        }
    };

    const handleDeleteHost = async (id) => {
        try {
            await deleteHost(id);
            await fetchHostsByConventionId(conventionId);
        } catch (error) {
            console.error("Error deleting host: ", error);
            setPageError("Failed to delete host");
        }
    };

    if (status === "pending") return <h2>Loading...</h2>
    if (status === "rejected")return <h2>Error: {pageError} </h2>

    return (
        <div>
            <h1> Hosts </h1>
            {selectedConventionHosts.length> 0 ? (
                <ul>
                    {selectedConventionHosts.map((host) => (
                        <li key={host.id}>
                            <h3>{host.name}</h3>
                            <p>Industry: {host.industry}</p>
                            <button onClick={() => handleDeleteHost(host.id)}>Delete Host</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p> No hosts found for this convention.</p>
            )}
            <AddHostForm conventionId={conventionId} onAddHost={handleAddHost} />
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default HostsPage;
