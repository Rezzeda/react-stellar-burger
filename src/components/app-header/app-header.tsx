
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useMemo } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function AppHeader() {

    const location = useLocation();
    const pathname = useMemo(() => location.pathname, [location]);

    return (
        <header className ={cn(styles.header, 'pt-4', 'pb-4')}>
            <nav>
                <ul className={styles.left_container}>
                    <li className={styles.item}>
                        <NavLink className={cn(styles.link, {
                            [styles.link_active]: pathname === "/",
                        })} to="/">
                            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
                            <p className="text text_type_main-default">Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        < NavLink className={cn(styles.link, {
                            [styles.link_active]: pathname === "/feed",
                        })} to="/feed">
                            <ListIcon type={pathname === "/feed" ? "primary" : "secondary"} />
                            <p className="text text_type_main-default">Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}>
                <NavLink className={styles.link} to="/">
                    <Logo />
                </NavLink>
            </div>
            <div>
                < NavLink className={cn(styles.link, {
                            [styles.link_active]: pathname === "/profile",
                        })} to="/profile">
                    <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
                    <p className="text text_type_main-default" >Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    );
}