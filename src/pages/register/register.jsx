import styles from './register.module.css'
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/userSlice';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)) // Вызываем функцию registerUser из Redux slice и передаем ей данные формы
            .unwrap()
            .then((response) => {
                console.log("Успешная регистрация:", response);
            })
            .catch((error) => {
                console.error("Ошибка регистрации:", error);
        });
    };

    return (
    <div className={styles.container}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
        <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={false}
            errorText={"Введите корректное имя"}
            extraClass={styles.name_input}
        />

        <Input type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={false}
            errorText={"Введите корректный e-mail"}
            extraClass={styles.email_input}
        />

        <PasswordInput
            placeholder="Пароль"
            name="password"
            value={formData.password}
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
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?{" "}
            <Link to={"/login"} className={styles.link}>
                Войти
            </Link>
        </p>
        </form>
    </div>
    )
}