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
    const [currentTab, setCurrentTab] = useState(0); // Состояние для хранения текущей вкладки


    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    const ingredientTypes = ingredients ? ingredients.reduce((result, ingredient) => {
        if (!result[ingredient.type]) {
            result[ingredient.type] = [];
        }
        result[ingredient.type].push(ingredient);
        return result;
    }, {}) : {};

    const typeNames = Object.keys(ingredientTypes);

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const type = entry.target.getAttribute('data-type');
                    const index = typeNames.indexOf(type);
                    setCurrentTab(index);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        Object.values(listTitleRefs.current).forEach((ref) => {
            observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, [typeNames]);

    const handleTabChange = (index) => {
        setCurrentTab(index);
        if (listTitleRefs.current[typeNames[index]]) {
            listTitleRefs.current[typeNames[index]].scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={cn(styles.container, "custom-scroll")} >
            <BurgerIngredientsTabs typeNames={typeNames} currentTab={currentTab} onTabChange={handleTabChange} />
            {typeNames.map((type) => (
                <div key={type} data-type={type} ref={(ref) => (listTitleRefs.current[type] = ref)} >
                    <h2 className={cn("text text_type_main-medium")}>
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