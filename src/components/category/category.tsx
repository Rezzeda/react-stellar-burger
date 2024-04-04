import styles from "./category.module.css";
import cn from "classnames";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { selectorIngredientCounts } from '../../services/selectors';
import { useAppSelector } from "../../hooks/appHooks";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ICategoryProps {
    image: string;
    price: number;
    name: string;
    type: string;
    _id: string;
    onClick: () => void;
    onDragStart?: () => void;
}

const Category: React.FC<ICategoryProps> = ({ image, price, name, type, _id, onClick, onDragStart }) => {
    const location = useLocation();

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "INGREDIENT",
        item: { image, price, name, type, _id },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    }));

    const ingredientCounts = useAppSelector(selectorIngredientCounts);
    const ingredientArray = ingredientCounts[_id];
    const count = ingredientArray ? ingredientArray.reduce((acc, cur) => acc + cur.count, 0) : 0;

    return (
        <Link className={styles.link} to={`/ingredients/${_id}`} state={{ backgroundLocation: location }}>
            <div className={styles.category} onClick={onClick} ref={dragRef}
            onDragStart={onDragStart}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            <article className={cn(styles.card, 'text text_type_main-medium mt-10')}>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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

export default Category;