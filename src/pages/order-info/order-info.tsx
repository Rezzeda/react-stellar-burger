import { useParams } from "react-router";
import styles from "./order-info.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { useEffect } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';
import { selectorAllIngredients, selectorCurrentOrder, selectorisLoadingOrder } from "../../services/selectors";
import { getOrders } from "../../services/orderSlice";
import IngredientIcon from "../../components/ingredient-icon/ingredient-icon";
import { IngredientType, OrderType } from "../../utils/types";

export default function OrderInfo() {
  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector(selectorCurrentOrder);
  const isLoading = useAppSelector(selectorisLoadingOrder);
  const { number } = useParams();
  const allIngredients = useAppSelector(selectorAllIngredients);

  useEffect(() => {
    if (number) {
      dispatch(getOrders(number));
    }
  }, [dispatch, number]);

  const calculatePrice = (order: OrderType, ingredients: IngredientType[]): number => {
    let totalPrice = 0;
    order.ingredients.forEach(id => {
      const ingredient = ingredients.find(item => item._id === id);
      if (ingredient) {
        totalPrice += ingredient.price;
      }
    });
    return totalPrice;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        currentOrder && (
          <div className={styles.order_info_container}>
            <p className={`${styles.order_number} text text_type_digits-default mb-10`}>{`#${currentOrder.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">{currentOrder.name}</h2>
            <p
              className="text text_type_main-default mb-15"
              style={{ color: currentOrder.status === "done" ? "#0cc" : "" }}>
              {currentOrder.status === "done" ? "Выполнен" : "Готовится"}
            </p>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
            <div className={styles.ingredients_container}>
              {currentOrder.ingredients
                .reduce((unique: string[], item: string) => {
                  return unique.includes(item) ? unique : [...unique, item];
                }, [])
                .map((item, index) => {
                  const ingredient = allIngredients?.find(ingredient => ingredient._id === item);
                  return (
                    ingredient && (
                      <div
                        key={index}
                        className={styles.ingredient}>
                        <div className={styles.ingredient_name}>
                          <IngredientIcon ingredient={ingredient?._id} />
                          <p className="text text_type_main-default">{ingredient.name}</p>
                        </div>
                        <div className={styles.price_container}>
                          <p className="text text_type_digits-default">
                            {`${currentOrder.ingredients.filter(i => i === item).length} x`}
                          </p>
                          <p className="text text_type_digits-default">{ingredient.price}</p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div className={styles.total}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(currentOrder.createdAt)} /> i-GMT+3
              </p>
              <div className={styles.price_container}>
                <p className="text text_type_digits-default">{calculatePrice(currentOrder, allIngredients)}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}