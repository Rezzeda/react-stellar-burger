import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

export default function AppHeader() {
    return (
        <header className ={cn(styles.header, 'pt-4', 'pb-4')}>
            <nav>
                <ul className={styles.left_container}>
                    <li className={styles.item}>
                        <a className={styles.link} href="#">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a className={styles.link}href="#">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}><Logo /></div>
            <div>
                <a className={styles.link} href="#">
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive" >Личный кабинет</p>
                </a>
            </div>
        </header>
    );
}