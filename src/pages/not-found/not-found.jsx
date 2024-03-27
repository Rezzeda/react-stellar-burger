import cn from "classnames";
import styles from "./not-found.module.css";
import { Link } from 'react-router-dom';



export default function NotFoundPage() {
    return (
        <section className={styles.container}>
            <h1 className={cn('text text_type_digits-large mb-8')}>404</h1>
            <p className={cn('text text_type_main-large mb-8')}>Страница не найдена</p>
            <p className="text text_type_main-medium text_color_inactive">
                <Link to={"/"} className={styles.link}>
                    На главную
                </Link>
            </p>
        </section>
    );
}