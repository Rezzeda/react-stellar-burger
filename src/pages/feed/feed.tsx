import { useEffect } from 'react';
import styles from './feed.module.css';
import cn from "classnames";
import OrderFeed from '../../components/order-feed/order-feed';
import TotalOrders from '../../components/total-orders/total-orders';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { wsConnectFeed, wsDisconnectFeed } from '../../services/feed/actions';
import { wsUrl } from '../../utils/api';


export default function FeedPage() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(store => store.feed.data);

    useEffect(() => {
        dispatch(
            wsConnectFeed({
                wsUrl: wsUrl,
                withTokenRefresh: true,
            })
        );
        return () => {
            dispatch(wsDisconnectFeed());
            };
        }, [dispatch]);

    return (
        <main className={styles.container}>
            <h1 className="text text_type_main-large mb-4">Лента заказов</h1>
            <div className={cn(styles.orders_container)}>
                <section className={styles.orders}>
                {orders?.orders.map((order) => (
                    <OrderFeed order={order} url={"/feed"} key={order._id} />
                ))}
                </section>
                <section className={styles.order_status}>
                <TotalOrders/>
                </section>
            </div>
        </main>
    );
}