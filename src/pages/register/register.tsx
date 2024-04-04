import styles from './register.module.css'
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import React, { FormEvent } from "react";

interface IRegisterProps {
    onRegister: (data: { email: string; password: string; name: string }) => void;
}

const RegisterPage: React.FC<IRegisterProps> = ({ onRegister }) => {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
        name: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!values.email || !values.password || !values.name) {
            return;
        }
        onRegister(values as { email: string; password: string; name: string });
    };

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={false}
                    errorText={"Введите корректное имя"}
                    extraClass={styles.name_input}
                />

                <Input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={false}
                    errorText={"Введите корректный e-mail"}
                    extraClass={styles.email_input}
                />

                <PasswordInput
                    placeholder="Пароль"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    size={"default"}
                    extraClass={styles.password_input}
                />

                <Button
                    type="primary"
                    size="medium"
                    htmlType="submit"
                    extraClass={styles.button}
                >
                    Зарегистрироваться
                </Button>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?{" "}
                    <Link to={"/login"} className={styles.link}>
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;