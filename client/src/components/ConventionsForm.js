import React, {useState, useContext} from "react";
import {ConventionContext} from "../context/ConventionContext";

function AddConventionForm({ areaId }) {
    const [conventionName, setConventionName] = useState("");
    const [days, setDays] = useState("");
    const [hostCompanyId, setHostCompanyId] = useState("");
    
    const { addConvention } = useContext(ConventionContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newConvention = {
            convention_name: conventionName,
            days: parseInt(days),
            convention_area_id: parseInt(areaId),
            host_company_id: parseInt(hostCompanyId),
        };

        addConvention(newConvention);
        setConventionName("")
        setDays("");
        setHostCompanyId("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Convention</h2>
            <label>
                Convention Name:
            <input 
                type="text"
                value={conventionName}
                onChange={(e) =>setConventionName(e.target.value)}
            />
            </label>
            <br />
            <label>
                Days:
                <input 
                    type="number"
                    value={days}
                    onChange={(e)=> setDays(e.target.value)}
                />
            </label>
            <br />
            <label>
                Host Company ID:
                <input 
                    type="number"
                    value={hostCompanyId}
                    onChange={(e) => setHostCompanyId(e.target.value)}
                />
            </label>
            <br />
            <button type="submit"> Add Convention</button>
        </form>
    )
}

export default AddConventionForm;