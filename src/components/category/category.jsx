import styles from "./category.module.css";
import cn from "classnames";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export default function Category(props) {
    const { image, price, name, onClick } = props;

    return (
        <div className={styles.category} onClick={onClick}>
            <article className={cn(styles.card, 'text text_type_main-medium mt-10')}>
            <Counter count={1} size="default" extraClass="m-1" />
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
    );
}

Category.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};