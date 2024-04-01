
import styles from './profile-info.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuth, updateUserInfo } from '../../services/userSlice'

export default function ProfileInfo() {

    const [form, setFormValues] = useState({ name: "", email: "", password: "" });
    const [isFormChanged, setIsFormChanged] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);

    useEffect(() => {
        if (userData && userData.user) {
            setFormValues({
                name: userData.user.name,
                email: userData.user.email,
                password: "",
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormValues({ ...form, [e.target.name]: e.target.value });
        setIsFormChanged(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(form));
        dispatch(checkUserAuth());
        setIsFormChanged(false);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormValues({
        name: userData.user.name,
        email: userData.user.email,
        password: "",
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type={"text"}
                name={"name"}
                placeholder={"Имя"}
                value={form.name}
                onChange={handleChange}
                icon={"EditIcon"}
                error={false}
                extraClass={styles.name_input}
            />
            <Input
                type={"text"}
                name={"email"}
                placeholder={"e-mail"}
                value={form.email}
                onChange={handleChange}
                icon={"EditIcon"}
                error={false}
                extraClass={styles.email_input}
            />
            <PasswordInput
                type={"text"}
                name={"password"}
                placeholder={"Пароль"}
                value={form.password}
                onChange={handleChange}
                size={"default"}
                icon={"EditIcon"}
                error={false}
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
