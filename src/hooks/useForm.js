import { useState } from "react";

export function useForm(initialValues) {

    const [form, setForm] = useState(initialValues);

    const handlerSetForm = (event) => {
        const {name, value} = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const customSetForm = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const resetForm = () => setForm(initialValues);

    return {
        form,
        handlerSetForm,
        resetForm,
        customSetForm
    }

}