import React, {useState} from "react";
import {Link} from "react-router-dom";

function ConventionCard({convention, onUpdate, onDelete}) {
    const [conventionName, setConventionName] = useState(convention.convention_name);
    const [days, setDays] = useState(convention.days)
    cosnt [isEditing, setIsEditing] = useState(false);
}