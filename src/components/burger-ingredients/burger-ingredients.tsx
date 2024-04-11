import styles from "./burger-ingredients.module.css";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import Category from "../category/category";
import cn from "classnames";
import { useAppSelector } from "../../hooks/appHooks";
import { useEffect, useState, useRef } from "react";
import { selectorAllIngredients } from "../../services/selectors";
import { typeToTitle } from "../../utils/constants";
import { IngredientType } from "../../utils/types";

interface IBurgerIngredientsProps {
    setModal: (modal: any) => void;
};

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({ setModal }) => {
    const ingredients = useAppSelector(selectorAllIngredients);
    const listTitleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [currentTab, setCurrentTab] = useState<number>(0);

    const ingredientTypes: { [key: string]: IngredientType[] } = ingredients
        ? ingredients.reduce((result: { [key: string]: IngredientType[] }, ingredient: IngredientType) => {
                if (!result[ingredient.type]) {
                    result[ingredient.type] = [];
                }
                result[ingredient.type].push(ingredient);
                return result;
            }, {})
        : {};

    const typeNames = Object.keys(ingredientTypes);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const type = entry.target.getAttribute('data-type');
                    const index = typeNames.indexOf(type || '');
                    setCurrentTab(index);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        Object.values(listTitleRefs.current).forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [typeNames]);

    const handleTabChange = (index: number) => {
        setCurrentTab(index);
        if (listTitleRefs.current[typeNames[index]]) {
            listTitleRefs.current[typeNames[index]]?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={cn(styles.container, 'custom-scroll')}>
            <BurgerIngredientsTabs typeNames={typeNames} currentTab={currentTab} onTabChange={handleTabChange} />
            {typeNames.map((type) => (
                <div key={type} data-type={type} ref={(ref) => (listTitleRefs.current[type] = ref)}>
                    <h2 className={cn('text text_type_main-medium')}>
                        {typeToTitle[type] || type}
                    </h2>
                    <ul className={cn(styles.ingredients__list, 'custom-scroll')} data-cy="ingredients">
                        {ingredientTypes[type].map((ingredient) => (
                            <li key={ingredient._id} className={cn(styles.category, 'mb-10')}>
                                <Category {...ingredient} onClick={() => setModal({ ...ingredient, showModal: true })} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BurgerIngredients;