import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

function HostsPage(){
    const {conventionId} = useParams();
    const [hosts, setHosts] =useState([]);
    const [conventionName, setConventionName] = useState("");
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState(null)
}
