import styles from './ingredient-icon.module.css';
import { useAppSelector } from "../../hooks/appHooks";
import { selectorAllIngredients } from "../../services/selectors";
import { IngredientType } from "../../utils/types";

interface IIngredientIconProps {
    ingredient: string;
    counter?: number;
}

export default function IngredientIcon({ ingredient, counter }: IIngredientIconProps) {
    const allIngredients = useAppSelector(selectorAllIngredients);
    const currentIngredient: IngredientType | undefined = allIngredients.find(item => item._id === ingredient);
    if (!currentIngredient) {
        return null;
    }
    return (
        <div className={styles.container}>
            <img
            className={styles.icon}
            src={currentIngredient.image}
            alt={currentIngredient.name}
            />
            {counter ? <p className={`${styles.counter} text text_type_main-default`}>{`+${counter}`}</p> : null}
        </div>
    );
}