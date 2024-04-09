import React, { useMemo } from 'react';
import styles from './total-orders.module.css';
import { useAppSelector } from '../../hooks/appHooks';

export default function TotalOrders() {
    const orders = useAppSelector(store => store.feed.data);
    // фильтрация readyOrders и inProgressOrders произойдет только при изменении orders,
    // и не будет лишних вычислений при каждом рендеринге компонента.
    const filteredOrders = useMemo(() => {
        const readyOrders = orders?.orders.filter(order => order.status === "done");
        const inProgressOrders = orders?.orders.filter(order => order.status !== "done");
        return { readyOrders, inProgressOrders };
    }, [orders]);
    // const readyOrders = orders?.orders.filter(order => order.status === "done");
    // const inProgressOrders = orders?.orders.filter(order => order.status !== "done");

    return (
        <div className={styles.summary__container}>
            <div className={styles.status}>
            <div className={styles.status_ready}>
                <p className="text text_type_main-default mb-6">Готовы:</p>
                <div className={styles.ready}>
                {/* {readyOrders?.map(order => ( */}
                {filteredOrders.readyOrders?.map(order => (
                    <p
                    key={order._id}
                    className={`${styles.ready_order} text text_type_digits-default`}>
                    {order.number}
                    </p>
                ))}
                </div>
            </div>
            <div className={styles.status_in_progress}>
                <p className="text text_type_main-default mb-6">В работе:</p>
                <div className={styles.in_progress}>
                {/* {inProgressOrders?.map(order => ( */}
                {filteredOrders.inProgressOrders?.map(order => (
                    <p
                    key={order._id}
                    className={`${styles.progress_order} text text_type_digits-default`}>
                    {order.number}
                    </p>
                ))}
                </div>
            </div>
            </div>
            <div className={styles.alltime}>
            <p className="text text_type_main-default">Выполнено за все время:</p>
            <p className={`${styles.shadow} text text_type_digits-large`}>{orders?.total}</p>
            </div>
            <div className={styles.today}>
            <p className="text text_type_main-default">Выполнено за сегодня:</p>
            <p className={`${styles.shadow} text text_type_digits-large`}>{orders?.totalToday}</p>
            </div>
        </div>
    );
}