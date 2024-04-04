
import styles from './profile-info.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuth, updateUserInfo } from '../../services/userSlice'
import { useForm } from "../../hooks/useForm";
import { selectorUser } from '../../services/selectors'
import { RootState } from "../../services/rootReducers";

type TUserData = {
    user: {
        name: string;
        email: string;
    }
} | null;

export default function ProfileInfo() {
    const dispatch = useDispatch();
    const userData = useSelector<RootState, TUserData>(selectorUser);
        const { values, handleChange, isFormChanged, setIsFormChanged, setValues } = useForm({
        name: userData?.user.name || "",
        email: userData?.user.email || "",
        password: "",
    });

    useEffect(() => {
        if (userData) {
            setValues({
                name: userData.user.name || "",
                email: userData.user.email || "",
                password: "",
            });
        }
    }, [userData, setValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserInfo(values));
        dispatch(checkUserAuth());
        setIsFormChanged(false);
    };

    const handleCancel = () => {
        setValues({
            name: userData?.user.name || "",
            email: userData?.user.email || "",
            password: "",
            });
        setIsFormChanged(false);
    };


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type={"text"}
                name={"name"}
                placeholder={"Имя"}
                value={values.name}
                onChange={handleChange}
                icon={"EditIcon"}
                error={false}
                extraClass={styles.name_input}
            />
            <Input
                type={"text"}
                name={"email"}
                placeholder={"e-mail"}
                value={values.email}
                onChange={handleChange}
                icon={"EditIcon"}
                error={false}
                extraClass={styles.email_input}
            />
            <PasswordInput
                // type={"text"}
                name={"password"}
                placeholder={"Пароль"}
                value={values.password}
                onChange={handleChange}
                size={"default"}
                icon={"EditIcon"}
                // error={false}
                extraClass={styles.password_input}
            />
            {isFormChanged && (
                <div className={styles.wrapper}>
                <Button htmlType="submit">Сохранить</Button>
                <Button onClick={handleCancel} htmlType="button" type="secondary">
                    Отмена
                </Button>
                </div>
            )}
        </form>
    )
}