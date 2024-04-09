import React, { useMemo } from 'react';
import styles from './order-feed.module.css';
import { Link } from "react-router-dom";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientType, OrderType } from '../../utils/types';
import { useAppSelector } from '../../hooks/appHooks';
import { useLocation } from "react-router";
import { selectorAllIngredients } from '../../services/selectors';
import IngredientIcon from '../ingredient-icon/ingredient-icon';

interface OrderProps {
    order: OrderType;
    url?: string;
    showStatus?: boolean;
}

export default function OrderFeed({ order, url, showStatus = false }: OrderProps) {
    const allIngredients = useAppSelector(selectorAllIngredients);
    const location = useLocation();
    const maxNumberOfIngredients = 6;

const SumOrder = useMemo<number>(() => {
    return order.ingredients.reduce((totalPrice, id) => {
        const ingredient = allIngredients.find(item => item._id === id);
        if (ingredient) {
            totalPrice += ingredient.price;
        }
        return totalPrice;
    }, 0);
}, [order.ingredients, allIngredients]);

    return (
        <Link
            to={`${url}/${order.number}`}
            state={{ backgroundLocation: location }}
            className={styles.link}>
            <div className={styles.order__container}>
            <div className={styles.data}>
                <p className={`${styles.order__number} text text_type_digits-default`}>{`#${order.number}`}</p>
                <p className={`${styles.order__date} text text_type_main-default text_color_inactive`}>
                <FormattedDate date={new Date(order.createdAt)} />i-GMT+3
                </p>
            </div>
            <h2 className={`${styles.order__title} text text_type_main-medium`}>{order.name}</h2>
            {showStatus ? (
                <p
                    className={`${styles.order__status} text text_type_main-default`}
                    style={{ color: order.status === "done" ? "#0CC" : "" }}>
                    {order.status === "done" ? "Выполнен" : "Готовится"}
                </p>
            ) : null}
            <div className={styles.ingredients__container}>
                <div className={styles.ingredients}>
                {order.ingredients.slice(0, maxNumberOfIngredients).map((ingredient, index) => (
                    <IngredientIcon
                    key={index}
                    ingredient={ingredient}
                    counter={
                        index === maxNumberOfIngredients - 1 ? order.ingredients.length - maxNumberOfIngredients : undefined
                    }
                    />
                ))}
                </div>
                <div className={styles.price}>
                <p className="text text_type_digits-default">{SumOrder}</p>
                <CurrencyIcon type="primary" />
                </div>
            </div>
            </div>
        </Link>
    );
}