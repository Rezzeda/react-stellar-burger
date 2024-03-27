import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export default function AppHeader() {
    return (
        <header className ={cn(styles.header, 'pt-4', 'pb-4')}>
            <nav>
                <ul className={styles.left_container}>
                    <li className={styles.item}>
                        <NavLink className={styles.link} to="/">
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink className={styles.link} to="/orders">
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}><Logo /></div>
            <div>
                <NavLink className={styles.link} to="/profile">
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive" >Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    );
}