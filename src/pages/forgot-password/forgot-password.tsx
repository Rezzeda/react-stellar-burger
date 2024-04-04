import styles from './forgot-password.module.css'
import { useDispatch } from 'react-redux';
import { Input,  Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswords } from '../../services/userSlice';
import { useForm } from '../../hooks/useForm';


export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Используем хук useForm
    const { values, handleChange } = useForm({
        email: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPasswords(values.email)); //Отправляем данные кастомного хука
        navigate("/reset-password", { state: { fromForgotPassword: true } });
    };

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Укажите e-mail"
                    value={values.email} //Используем значения из useForm
                    name="email"
                    onChange={handleChange} //Обработчик изменений
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