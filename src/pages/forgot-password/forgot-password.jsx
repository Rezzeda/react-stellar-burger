import styles from './forgot-password.module.css'
import { useDispatch } from 'react-redux';
import { Input,  Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { forgotPasswords } from '../../services/userSlice';

export default function ForgotPasswordPage() {

    const [form, setFormValues] = useState({ email: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormValues({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswords(form.email));
        navigate("/reset-password", { state: { fromForgotPassword: true } });
    };

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
            <form className={styles.form}  onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Укажите e-mail"
                value={form.email}
                name={"email"}
                onChange={handleChange}
                error={false}
                errorText={"Введите корректный e-mail"}
                extraClass={styles.input}
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