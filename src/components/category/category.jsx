import styles from "./category.module.css";
import cn from "classnames";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { selectorIngredientCounts } from '../../services/selectors';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Category({ image, price, name, type, _id, onClick, onDragStart} ) {
    const location = useLocation();

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "INGREDIENT",
        item: { image, price, name, type, _id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const ingredientCounts = useSelector(selectorIngredientCounts);
    // console.log(uniqueIngredientCounts);

    // Найдем массив объектов ингредиентов с правильным _id в uniqueIngredientCounts
    const ingredientArray = ingredientCounts[_id];
    // Посчитаем общее количество для данного _id
    // acc (аккумулятор) и cur (текущий элемент массива). 
    // В каждой итерации она добавляет значение свойства count текущего элементак аккумулятору.
    // 0 - это начальное значение аккумулятора, так как пока у нас еще нет суммы.
    // : 0 - это условная операция. 
    // Если ingredientArray равен null или undefined, то есть если нет ингредиентов с заданным _id, то count устанавливается в ноль.
    const count = ingredientArray ? ingredientArray.reduce((acc, cur) => acc + cur.count, 0) : 0;

    return (
        <Link className={styles.link} to={`/ingredients/${_id}`} state={{ backgroundLocation: location }}>
            <div className={styles.category} onClick={onClick} ref={dragRef}
            onDragStart={onDragStart}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
                <article className={cn(styles.card, 'text text_type_main-medium mt-10')}>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
                {/* <Counter count={1} size="default" extraClass="m-1" /> */}
                <div className={styles.item}>
                    <div className={styles.item_img}>
                    <img src={image} alt={name} />
                    </div>
                    <div className={styles.container}>
                    <div className={styles.price}>
                        <p className={cn('text text_type_digits-default pr-1')}>{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <h3 className={cn('text text_type_main-small')}>{name}</h3>
                    </div>
                </div>
                </article>
            </div>
        </Link>
    );
}

Category.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};