import React, { createContext, useState, useEffectm useCallback } from "react";

export const ConventionContext = createContext();

export function ConventionProvider({ children }) {
    const [conventionAreas, setConventionAreas] = useState([])
    const [conventions, setConventions] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [selectedConventionHosts, setSelectedConventionHosts] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/convention_areas")
            .then(response => response.json)
    })
}