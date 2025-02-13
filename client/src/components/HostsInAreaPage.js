import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ConventionContext } from "../context/ConventionContext";

function HostsInAreaPage() {
    const { areaId } = useParams();
    const { HostsByAreaId } = useContext(ConventionContext);
    const [ hosts, setHosts ] = useState([])
}