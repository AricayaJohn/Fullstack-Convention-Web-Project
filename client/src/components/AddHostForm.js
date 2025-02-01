import React, {useState} from "react";

function AddHostForm({ conventionId, onAddHost }) {
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHost = {
            name,
            industry,
            convention_id: parseInt(conventionId),
        };
        try {
            await onAddHost(newHost);
            setName("");
            setIndustry("");
        } catch (error) {
            console.error(error);
            alert("Failed to add host")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>If there is no Host add new Host Company</h2>
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