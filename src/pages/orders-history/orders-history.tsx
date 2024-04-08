import OrderFeed from '../../components/order-feed/order-feed';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { wsConnectOrder, wsDisconnectOrder } from '../../services/all-orders/actions';
import { getCookie } from '../../utils/cookie';
import styles from './orders-history.module.css';
import { useEffect, useMemo } from "react";

export default function OrdersHistory() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.allOrders.data);

    // Сортировка массива orders по номеру заказа от последнего к первому
    const sortedOrders = useMemo(() => {
        if (orders && orders.orders) {
            return [...orders.orders].sort((a, b) => b.number - a.number);
        }
        return [];
    }, [orders]);

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(
            wsConnectOrder({
                wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken?.replace("Bearer ", "")}`,
                withTokenRefresh: true,
            })
        );
        return () => {
            dispatch(wsDisconnectOrder());
        };
    }, [dispatch]);

    return (
        <section>
            <div className={styles.container} >
                {sortedOrders.map((order) => (
                    <OrderFeed
                        key={order._id}
                        order={order}
                        url={"/profile/orders"}
                        showStatus={true}
                    />
                ))}
            </div>
        </section>
    );
}