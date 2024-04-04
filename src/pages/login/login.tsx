import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css"
import { useDispatch, } from "react-redux";
import { loginUser } from "../../services/userSlice";
import { useForm } from "../../hooks/useForm";
import React from "react";

interface ILoginProps {
    onLogin: (data: { email: string; password: string }) => void;
}

export default function LoginPage({ onLogin }: ILoginProps) {

    const dispatch = useDispatch();

    // Используем кастомный хук useForm
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(values)); //Отправляем данные из кастомного хука
        onLogin (values)
    };

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Вход</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={values.email} // Используем значения из хука
                    onChange={handleChange} //Используем обработчик изменений из хука
                    error={false}
                    errorText={"Введите корректный e-mail"}
                    extraClass={styles.email_input}
                />
                <PasswordInput
                    placeholder="Пароль"
                    name="password"
                    value={values.password} // Используем значения из хука
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
                    Войти
                </Button>
                <p className="text text_type_main-default text_color_inactive"> Вы — новый пользователь?{" "}
                    <Link to={"/register"} className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?{" "}
                    <Link to={"/forgot-password"} className={styles.link}>
                        Восстановить пароль
                    </Link>
                </p>
            </form>
        </div>
    )
}