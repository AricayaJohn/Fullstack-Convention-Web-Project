import React, {useState} from "react";
import {Link} from "react-router-dom";

function ConventionAreaCard({ area, onUpdate, onDelete}) {
    const [locationName, setLocationName] = useState(area.locationName);
    const [venue, setVenue] = useState(area.venue);
    const [isEditing, setIsEditing] = useState(false);
    
}