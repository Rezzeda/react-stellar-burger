import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { selectorBurgerBuns, selectorOtherIngredients } from '../../services/selectors';
import DraggableIngredient from "../DraggableIngredient/DraggableIngredient";
import {  addBun, addIngredient } from '../../services/burgerConstuctorSlice';
import { useMemo } from "react";
import { submitOrder } from '../../services/orderSlice';


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
  const burgerBuns = useSelector(selectorBurgerBuns);
  const otherIngredients = useSelector(selectorOtherIngredients);
  const [isSubmitting, setIsSubmitting] = useState(false); // состояние для отключения кнопки во время загрузки


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

  const handleOrderSubmit = () => {
    // Создаем массив _id всех ингредиентов
    const ingredientIds = [...burgerBuns.map(bun => bun._id), ...otherIngredients.map(ingredient => ingredient._id)];
    // Отправляем запрос к API с использованием action creator submitOrder
    setIsSubmitting(true); // устанавливаем состояние в true при начале загрузки
    dispatch(submitOrder({ ingredients: ingredientIds }))
      .then(() => setModal(true)) // устанавливаем показ модального окна с номером заказа
      .then(() => setIsSubmitting(false)) // устанавливаем состояние в false после завершения запроса
      .catch(() => setIsSubmitting(false)); // в случае ошибки также устанавливаем состояние в false
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
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          // onClick={() => setModal(true)}
          onClick={handleOrderSubmit}
          disabled={isSubmitting} // используем состояние для отключения кнопки во время загрузки
          >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}