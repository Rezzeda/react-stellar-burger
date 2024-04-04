import styles from "./ingredient-details.module.css";
import cn from "classnames";
import { selectorAllIngredients } from "../../services/selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Loader from "../loader/loader";

const IngredientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const ingredientss = useSelector(selectorAllIngredients);
    const selectedIngredient = ingredientss.find((item) => item._id === id);

    useEffect(() => {}, [selectedIngredient, id]);

    //пока идет загрузка ингредиента
    if (!selectedIngredient) {
        return <Loader />;
    }

    return (
        <div className={styles.container}>
            {/* <h2 className={cn('text text_type_main-large', styles.title)}>Детали ингредиента</h2> */}
            <img className={cn(styles.image)}src={selectedIngredient.image} alt={selectedIngredient.name} />
            <p className={cn('text text_type_main-medium mt-4 mb-8')}>{selectedIngredient.name}</p>
            <ul className={cn(styles.info, 'text text_type_main-default text_color_inactive')}>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Калории,ккал</p>
                    <p className={cn(styles.info_num)}>{selectedIngredient.calories}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Белки, г</p>
                    <p className={cn(styles.info_num)}>{selectedIngredient.proteins}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Жиры, г</p>
                    <p className={cn(styles.info_num)}>{selectedIngredient.fat}</p>
                </li>
                <li className={cn(styles.info_item, 'text text_type_main-default text_color_inactive')}>
                    <p className={cn(styles.info_title)}>Углеводы, г</p>
                    <p className={cn(styles.info_num)}>{selectedIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;