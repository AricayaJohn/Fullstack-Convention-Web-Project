import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";
import ConventionCard from "./ConventionCard";
import AddConventionForm from "./ConventionsForm";

function ConventionsPage() {
    const { areaId } = useParams();
    const { conventions, addConvention, deleteConvention, updateConvention } = useContext(ConventionContext);

    const filteredConventions = conventions.filter(
        (convention) => convention.convention_area_id === parseInt(areaId)
    );

    return (
        <div>
            <h1> Conventions </h1>
            {filteredConventions.length > 0 ? (
                filteredConventions.map((convention) => (
                    <ConventionCard 
                    key={convention.id}
                    convention={convention}
                    onDelete={deleteConvention}
                    onUpdate={updateConvention}
                    />
                ))
            ) : (
                <p>No Conventions found for this area.</p>
            )}
            <AddConventionForm areaId={parseInt(areaId)} onAddConvention={addConvention} />
            <Link to="/">Back to Home </Link>
        </div>
    );
}

export default ConventionsPage;