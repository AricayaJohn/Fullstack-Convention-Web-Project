import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

function HostsPage(){
    const {conventionId} = useParams();
    const [hosts, setHosts] =useState([]);
    const [conventionName, setConventionName] = useState("");
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/conventions/${conventionId}`)
            .then((response) => response.json())
            .then((data) => {
                setConventionName(data.convention_name);
            })
            .catch((err) => {
                console.error('Error fetching convention details', err);
                setError('Failed to load convention details');
            });
        fetch(`/hosts?convention_id=${conventionId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch hosts");
                }
            })
            .then((data) => {
                setHosts(data);
                setStatus("resolved");
            })
            .catch((err) => {
                console.error('Error fetching hosts:', err);
                setError(err.message);
                setStatus("rejected");
            });
    }, [conventionId]);

}
