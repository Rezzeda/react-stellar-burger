import { useState } from "react";

// универсальный кастомный хук для контроля любого количества инпутов в любых формах:
export function useForm(inputValues={}) {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
        return {values, handleChange, setValues};
}