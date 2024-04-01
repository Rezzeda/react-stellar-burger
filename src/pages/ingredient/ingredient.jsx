import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css'

export default function IngredientPage () {
    return (
        <div className={styles.container}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails />
        </div>
    )
}