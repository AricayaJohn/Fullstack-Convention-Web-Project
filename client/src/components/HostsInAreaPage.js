import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";

function HostsInAreaPage() {
    const { areaId } = useParams();
    const { HostsByAreaId } = useContext(ConventionContext);
    const [ hosts, setHosts ] = useState([])
}

    return (
        <div>
            <h1>Hosts in Area</h1>
            {hosts.length > 0 ? (
                <ul>
                    {hosts.map((host) => (
                        <li key={host.id}>
                            <h2>{host.name}</h2>
                            <p>{host.industry}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hosts found in this area.</p>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
