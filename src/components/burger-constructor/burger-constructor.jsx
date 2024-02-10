import styles from "./burger-constructor.module.css";
import { data } from "../../utils/data";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';



export default function BurgerConstructor({setModal}) {

  const [totalPrice, setTotalPrice] = useState(0);

  // Отфильтровать данные, чтобы остались только булки
  const bunItem = data.find(item => item.type === 'bun');

  // Отфильтровать данные, чтобы остались только не булки
  const otherItems = data.filter(item => item.type !== 'bun');


    // Обновление суммы при изменении элементов
    const updateTotalPrice = () => {
      const newTotalPrice = data.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(newTotalPrice);
    };

    useEffect(() => {
      updateTotalPrice();
    }, [data]);

    return (
    <div>
      <div className={cn(styles.container_main)}>
        {bunItem && (
          <div className={cn(styles.element_locked, 'pl-4')}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunItem.name} (верх)`}
              price={bunItem.price}
              thumbnail={bunItem.image}
              onUpdateTotalPrice={updateTotalPrice}
            />
          </div>
        )}
        <div className={cn(styles.elementcontainer, 'custom-scroll', 'pl-4')}>
        {otherItems.map((item, index) => (
            <div className={cn(styles.element_main)} key={index} >
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                onUpdateTotalPrice={updateTotalPrice}
              />
            </div>
          ))}
        </div>
        {bunItem && (
          <div className={cn(styles.element_locked, 'pl-4')}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunItem.name} (низ)`}
              price={bunItem.price}
              thumbnail={bunItem.image}
              onUpdateTotalPrice={updateTotalPrice}
            />
          </div>
        )}
</div>
    <div className={cn(styles.sum_container, 'pr-4 mt-10')}>
            <div className={cn(styles.price)}>
              <p className={cn('text text_type_digits-medium')}>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button"
            type="primary"
            size="large"
            onClick={() => setModal(true)}
            >
              Оформить заказ
            </Button>
      </div>
    </div>
    )
  }

  BurgerConstructor.propTypes = {
    setModal: PropTypes.func.isRequired,
  };