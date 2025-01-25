import React, {useEffect, useState} from "react";
import ConventionAreaCard from "./ConventionAreaCard";

function HomePage() {
    const [conventionAreas, setConventionAreas] = useState([])

    useEffect(() => {
        fetch('/convention_areas')
            .then((response) => response.json())
            .then((data) => setConventionAreas(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    // const updateConventionAreas = (newArea) => {
    //     setConventionAreas((prevAreas) => [...prevAreas, newArea]);
    // };

    const handleDeleteArea = (id) => {
        setConventionAreas((prevAreas) => prevAreas.filter(area => area.id !== id));
    };

    const handleUpdateArea = (updateArea) => {
        setConventionAreas((prevAreas) => prevAreas.map( area => area.id === updateArea.id ? updateArea : area));
    };


    return (
        <div>
            <h1> Convention Areas</h1>
            {conventionAreas.length > 0 ? (
                conventionAreas.map((area) => (
                    <ConventionAreaCard
                        key={area.id}
                        area={area}
                        onDelete={handleDeleteArea}
                        onUpdate={handleUpdateArea}
                    />
                ))
            ) : (
                <p>No Convention areas found.</p>
            )}
        </div>
    )
}

export default HomePage;