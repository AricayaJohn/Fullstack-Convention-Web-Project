import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AddHostForm from "./AddHostForm";
import { ConventionContext } from "../context/ConventionContext";

function HostsPage() {
    const { conventionId } = useParams();
    const {
        selectedConventionHosts,
        HostsByConventionId,
        deleteHost,
        addHost } = useContext(ConventionContext);

    useEffect(() => {
        HostsByConventionId(conventionId);
    }, [conventionId, HostsByConventionId]);

    const handleAddHost = (newHost) => {
        addHost(newHost, conventionId);
        HostsByConventionId(conventionId);
    };

    const handleDeleteHost = (id) => {
        deleteHost(id);
        HostsByConventionId(conventionId);
    };

    return (
        <div>
            <h1>Host</h1>
            {selectedConventionHosts.length > 0 ? (
                <ul>
                    {selectedConventionHosts.map((host) => (
                        <li key={host.id}>
                            <h3>{host.name}</h3>
                            <p>Industry: {host.industry}</p>
                            <button onClick={() => handleDeleteHost(host.id)}>
                                Delete Host
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hosts found for this convention.</p>
            )}
            <AddHostForm conventionId={conventionId} onAddHost={handleAddHost} />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default HostsPage;