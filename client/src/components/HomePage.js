import React, { useContext } from "react";
import ConventionAreaCard from "./ConventionAreaCard";
import ConventionAreaForm from "./ConventionAreaForm";
import { ConventionContext } from "../context/ConventionContext";

function HomePage() {
    const {conventionAreas } = useContext(ConventionContext);

    return (
        <div>
            <h1> Areas</h1>
            {conventionAreas.length > 0 ? (
                conventionAreas.map((area) => (
                    <ConventionAreaCard
                        key={area.id}
                        area={area}
                    />
                ))
            ) : (
                <p>No Convention areas found.</p>
            )}
            <ConventionAreaForm />
        </div>
    )
}

export default HomePage;