import styles from './reset-password.module.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswords } from '../../services/userSlice';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from 'react-router-dom';


export default function ResetPasswordPage() {
    const [form, setFormValues] = useState({ password: "", token: "" });
    const [redirectToResetPassword, setRedirectToResetPassword] = useState(false);
    const location = useLocation();
    const [redirectToForgotPassword, setRedirectToForgotPassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!location.state?.fromForgotPassword) {
        setRedirectToForgotPassword(true);
        }
    }, [location]);

    if (redirectToForgotPassword) {
        return <Navigate to="/forgot-password" />;
    }

    const handleChange = (e) => {
        setFormValues({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswords(form));
        setRedirectToResetPassword(true);
    };

    if (redirectToResetPassword) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={styles.container}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <PasswordInput
                value={form.password}
                name={"password"}
                size={"default"}
                onChange={handleChange}
                extraClass={styles.input}
            />
            <Input
                type="text"
                placeholder="Введите код из письма"
                value={form.token}
                name={"token"}
                onChange={handleChange}
                error={false}
                errorText={""}
                extraClass={styles.email_input}
            />
            <Button
                type="primary"
                size="medium"
                htmlType="submit"
                extraClass={styles.button}
            >
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?{" "}
                <Link to={"/login"} className={styles.link}>
                    Войти
                </Link>
            </p>
        </form>
        </div>
    )
}