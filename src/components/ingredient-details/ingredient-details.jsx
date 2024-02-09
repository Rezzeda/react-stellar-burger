import styles from "./ingredient-details.module.css";
import Modal from "../modal/modal";
import cn from "classnames";
import PropTypes from 'prop-types';


export default function IngredientDetails({ selectedIngredient }) {
    const { image, name, calories, proteins, fat, carbohydrates } = selectedIngredient;

    return (
        <div className={styles.container}>
            {/* <h2 className={cn('text text_type_main-large', styles.title)}>Детали ингредиента</h2> */}
            <img className={cn(styles.image)}src={image} alt={name} />
            <p className={cn('text text_type_main-medium mt-4 mb-8')}>{name}</p>
            <ul className={cn(styles.info, 'text text_type_main-default text_color_inactive')}>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Калории,ккал</p>
                    <p className={cn(styles.info_num)}>{calories}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Белки, г</p>
                    <p className={cn(styles.info_num)}>{proteins}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Жиры, г</p>
                    <p className={cn(styles.info_num)}>{fat}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Углеводы, г</p>
                    <p className={cn(styles.info_num)}>{carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}