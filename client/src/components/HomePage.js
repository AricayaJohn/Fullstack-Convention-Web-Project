import React, {useEffect, useState} from "react";

function HomePage() {
    const [conventionAreas, setConventionAreas] = useState([])

    useEffect(() => {
        fetch('/convention_areas')
            .then((response) => response.json())
            .then((data) => setConventionAreas(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div>
            <h1> Convention Areas</h1>
        </div>
    )
}