import styles from "./burger-ingredients.module.css";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import Category from "../category/category";
import cn from "classnames";


export default function BurgerIngredients(props) {
    // console.log(props);
    const {ingredients} = props;
    // console.log(ingredients);

 //возвращаем ключи типов ингредиентов
    const typeNames = Object.keys(ingredients).map(key => {
        return key;
    });

    // console.log(typeNames);
    return (
        <>
            <BurgerIngredientsTabs typeNames = {typeNames}/>
            <div className={cn(styles.container, 'custom-scroll')}>
                <h2 className={cn('text text_type_main-medium')}>Булки</h2>
                <ul className={cn(styles.ingredients__list, 'custom-scroll')}>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                </ul>
                <h2 className={cn('text text_type_main-medium')}>Соусы</h2>
                <ul className={cn(styles.ingredients__list, 'custom-scroll')}>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                    <li className={cn(styles.category, 'mb-10')}><Category /></li>
                </ul>
            </div>
        </>
    )
}