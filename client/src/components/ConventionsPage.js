import React, { useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

function ConventionPage() {
    const [conventions, setConventions] = useState([]);
    const [areaName, setAreaName] = useState("");
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("pending");
    const {areaId} = useParams();

    
}