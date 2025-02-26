import React, {useState, useContext} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ConventionContext } from "../context/ConventionContext";

function ConventionAreaForm() {
    const { addConventionArea } = useContext(ConventionContext);

    const formik = useFormik({
        initialValues: {
            locationName: '',
            venue: '',
        },
        validationSchema: Yup.object({
            locationName: Yup.string().required('Location Name'),
            venue: Yup.string().required('Venue is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const newArea = {location_name: values.locationName, venue: values.venue };
            addConventionArea(newArea);
            resetForm(); 
        },
    });

    return (
        <div>
            <h1>Add Convention Area</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="locationName"> Location Name:</label>
                <input 
                    id="locationName"
                    name="locationName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.locationName}
                />
                {formik.touched.locationName && formik.errors.locationName ? (
                    <div> {formik.errors.locationName}</div>
                ) : null}
                <label htmlFor="venue"> Venue: </label>
                <input 
                    id="venue"
                    name="venue"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.venue}
                />
                {formik.touched.venue && formik.errors.venue ? (
                    <div>{formik.errors.venue}</div>
                ) : null}
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ConventionAreaForm;