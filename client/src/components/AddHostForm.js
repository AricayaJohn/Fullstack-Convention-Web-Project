import React, {useState} from "react";

function AddHostForm({ conventionId, onAddHost }) {
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newHost = {
            name, industry, conventionId: parseInt(conventionId),
        };
        onAddHost(newHost);
        setName("");
        setIndustry("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Host Company</h2>
            <label>
                Name:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Industry:
                <input 
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
            </label>
            <br />
            <button type="submit"> Add Host</button>
        </form>
    );
}

export default AddHostForm;