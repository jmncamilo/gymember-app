/*
 * A custom React hook for managing object-based state with utility functions
 * to update specific keys, reset, clear, or replace the entire data object.
 */

import { useState } from "react";

export function useObjectState(initialValues = {}) {
    const [objectData, setObjectData] = useState(initialValues);

    const updateStateByKey = (key, value) => {
        setObjectData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const resetData = () => setObjectData(initialValues);

    const cleanData = () => setObjectData({});

    const replaceData = (newData) => setObjectData(newData);

    return {
        objectData,
        updateStateByKey,
        resetData,
        cleanData,
        replaceData
    }
}