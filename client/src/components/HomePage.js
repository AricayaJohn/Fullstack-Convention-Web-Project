import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ConventionAreaCard from "./ConventionAreaCard";
import ConventionAreaForm from "./ConventionAreaForm";
import { ConventionContext } from "../context/ConventionContext";

function HomePage() {
    const {conventionAreas } = useContext(ConventionContext);

    return (
        <div>
            <h1> Convention Areas</h1>
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
            <Link to ="/"> Back to Home </Link>
        </div>
    )
}

export default HomePage;