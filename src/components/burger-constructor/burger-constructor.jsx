import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { selectorBurgerBuns, selectorOtherIngredients, getIsAuthChecked, selectorUser } from '../../services/selectors';
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import {  addBun, addIngredient, clearBurger } from '../../services/burgerConstuctorSlice';
import { useMemo } from "react";
import { submitOrder } from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';


// Плейсхолдерные данные для bun
const placeholderBun = {
  id: 'placeholder-bun',
  name: 'Выберите булку',
  price: 0,
  thumbnail: null,
};

// Плейсхолдерные данные для других ингредиентов
const placeholderIngredient = {
    id: 'placeholder-ingredient',
    name: 'Выберите ингредиенты',
    price: 0,
    thumbnail: null,
};

export default function BurgerConstructor({ setModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const burgerBuns = useSelector(selectorBurgerBuns);
  const otherIngredients = useSelector(selectorOtherIngredients);
  const [hasBun, setHasBun] = useState(false); // состояние, отслеживающее наличие булки в заказе
  const [isLoading, setIsLoading] = useState(false); // состояние, отслеживающее процесс загрузки

  const [{ canDrop, isOver, itemDrag }, drop] = useDrop(() => ({
    accept: "INGREDIENT",
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        const newIngredient = { ...item, id: uuidv4() };
        dispatch(addIngredient(newIngredient));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      itemDrag: monitor.getItem(),
    }),
  }));

  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    burgerBuns.forEach(bun => totalPrice += bun.price * 2);
    otherIngredients.forEach(ingredient => totalPrice += ingredient.price);
    return totalPrice;
  }, [burgerBuns, otherIngredients]);

  // Обновление состояния hasBun, когда пользователь добавляет или удаляет булку из заказа
  useEffect(() => {
    setHasBun(burgerBuns.length > 0);
  }, [burgerBuns]);

  const handleOrderSubmit = () => {
    // Проверяем наличие булки в заказе перед оформлением заказа
    if (!hasBun) {
      alert('Пожалуйста, добавьте булку в заказ');
      return;
    }
    setIsLoading(true); // Устанавливаем состояние загрузки при начале отправки запроса
    // Создаем массив _id всех ингредиентов
    const ingredientIds = [...burgerBuns.map(bun => bun._id), ...otherIngredients.map(ingredient => ingredient._id)];
    // Отправляем запрос к API с использованием action creator submitOrder
    dispatch(submitOrder({ ingredients: ingredientIds }))
      .then(() => {
        setModal(true); // устанавливаем показ модального окна с номером заказа
        // Очищаем состояния, связанные с выбранными ингредиентами
        dispatch(clearBurger());
      })
      .catch(() =>
        alert('Произошла ошибка при оформлении заказа.')
      )
      .finally(() => {
        setIsLoading(false); // Устанавливаем состояние загрузки в false после получения ответа
      });
  };

  const handleOrderClick = () => {
    if (!hasBun) {
      alert('Пожалуйста, добавьте булку в заказ');
      return;
    }
    if (!isUserAuthenticated()) {
      navigate('/login', { state: { fromOrder: true } });
    } else {
      handleOrderSubmit();
    }
  };

  const user = useSelector(selectorUser);
  const isUserAuthenticated = () => {
    // проверка аутентификации пользователя, (!!) приводит объект user к логическому значению, 
    // преобразуя его в true, если user не является null или undefined, 
    // и в false, если user - пустой объект или null/undefined 
    // (то есть информация о пользователе доступна в состоянии), функция вернет true, иначе false.
    return !!user;
  };

  return (
    <div ref={drop}>
      <div className={styles.container_main}>
        {/* Проверяем, есть ли элементы в burgerBuns, если нет, используем плейсхолдер */}
        {burgerBuns.length === 0 ? (
          <div className={cn(styles.element_locked, 'pl-4')}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${placeholderBun.name} (верх)`}
              price={placeholderBun.price}
              thumbnail={placeholderBun.image}
            />
          </div>
        ) : (
          burgerBuns.map((bun, index) => (
            <div key={index} className={cn(styles.element_locked, 'pl-4')}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ))
        )}
        <div className={cn(styles.elementcontainer, 'custom-scroll', 'pl-4')}>
        {otherIngredients.length === 0 ? (
          <div className={styles.element_main} key={placeholderIngredient.id}>
          <DragIcon type="primary" />
            <ConstructorElement
              text={placeholderIngredient.name}
              price={placeholderIngredient.price}
              thumbnail={placeholderIngredient.image}
            />
        </div>
        ) : (
          otherIngredients.map((ingredient, index) => (
            <DraggableIngredient key={ingredient.id} ingredient={ingredient} index={index} />
          ))
        )}
        </div>
        {burgerBuns.length === 0 ? (
          <div className={cn(styles.element_locked, 'pl-4')}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${placeholderBun.name} (низ)`}
              price={placeholderBun.price}
              thumbnail={placeholderBun.image}
            />
          </div>
        ) : (
          burgerBuns.map((bun, index) => (
            <div key={index} className={cn(styles.element_locked, 'pl-4')}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ))
        )}
      </div>
      
      <div className={cn(styles.sum_container, 'pr-4 mt-10')}>
        <div className={cn(styles.price)}>
          <p className={cn('text text_type_digits-medium')}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleOrderClick}
              disabled={!hasBun || isLoading}
            >
              {isLoading ? "Отправка заказа..." : "Оформить заказ"}
            </Button>
        </div>
      </div>
    </div>
  );
}