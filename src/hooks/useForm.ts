import { useState, ChangeEvent } from "react";

interface FormValues {
    [key: string]: string;
}

// универсальный кастомный хук для контроля любого количества инпутов в любых формах:
export function useForm<T extends FormValues>(inputValues: T) {
    const [values, setValues] = useState(inputValues);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
        setIsFormChanged(true);
    };
        return {values, handleChange, isFormChanged, setIsFormChanged, setValues};
}