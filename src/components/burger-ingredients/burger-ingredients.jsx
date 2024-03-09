import styles from "./burger-ingredients.module.css";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import Category from "../category/category";
import cn from "classnames";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { selectorAllIngredients } from "../../services/selectors";
import { typeToTitle } from "../../utils/constants";

export default function BurgerIngredients({ setModal }) {
    const dispatch = useDispatch();
    const ingredients = useSelector(selectorAllIngredients)
    const listTitleRefs = useRef({});
    const [currentTab, setCurrentTab] = useState(null); // Состояние для хранения текущей вкладки


    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    useEffect(() => {
        if (currentTab && listTitleRefs.current[currentTab]) {
            listTitleRefs.current[currentTab].scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentTab]);

    const ingredientTypes = ingredients ? ingredients.reduce((result, ingredient) => {
        if (!result[ingredient.type]) {
            result[ingredient.type] = [];
        }
        result[ingredient.type].push(ingredient);
        return result;
    }, {}) : {};

    const typeNames = Object.keys(ingredientTypes);

// Функция для прокрутки к соответствующему типу ингредиентов
    const handleTabChange = (type) => {
        setCurrentTab(type);
    };

    return (
        <div className={cn(styles.container, "custom-scroll")}>
            <BurgerIngredientsTabs typeNames={typeNames} setCurrentTab={handleTabChange} />
            {typeNames.map((type) => (
                <div key={type}>
                    <h2 ref={(ref) => (listTitleRefs.current[type] = ref)} className={cn("text text_type_main-medium")}>
                        {typeToTitle[type] || type} 
                    </h2>
                    <ul className={cn(styles.ingredients__list, "custom-scroll")}>
                        {ingredientTypes[type].map(ingredient => (
                            <li key={ingredient._id} className={cn(styles.category, 'mb-10')}>
                                <Category {...ingredient} onClick={() => setModal({ ...ingredient, showModal: true })} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}