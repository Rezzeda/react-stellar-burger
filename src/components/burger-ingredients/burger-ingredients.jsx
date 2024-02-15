import styles from "./burger-ingredients.module.css";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import Category from "../category/category";
import cn from "classnames";
import PropTypes from 'prop-types';
import { fetchIngredients } from "../../services/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";


// export default function BurgerIngredients(props) {
//     // console.log(props);
//     const { ingredients, setModal} = props;
// //   console.log(ingredients);

//   //возвращаем ключи типов ингредиентов
//     const typeNames = Object.keys(ingredients).map((key) => {
//     return key;
//     });

//     return (
//     <>
//         <BurgerIngredientsTabs typeNames={typeNames} />
//         <div className={cn(styles.container, "custom-scroll")}>
//             {/* Выводим список ингредиентов для каждой категории */}
//             {typeNames.map((type) => (
//                 <div key={type}>
//                     <h2 className={cn("text text_type_main-medium")}>{type}</h2>
//                     <ul className={cn(styles.ingredients__list, "custom-scroll")}>
//                         {/* Выводим ингредиенты для текущей категории */}
//                         {ingredients[type].map((ingredient) => (
//                             <li key={ingredient._id} className={cn(styles.category, 'mb-10')}>
//                                 <Category 
//                                 image={ingredient.image} 
//                                 price={ingredient.price} 
//                                 name={ingredient.name}
//                                 // _id={ingredient._id}
//                                 // onClick={() => setModal(true)}
//                                 onClick={() => setModal({ ...ingredient, showModal: true })}
//                                 />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     </>
//     );
// }

export default function BurgerIngredients(props) {
    const { setModal } = props;
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredients.allIngredients);
    const listTitleRefs = useRef({});
    const [currentTab, setCurrentTab] = React.useState(null); // Состояние для хранения текущей вкладки


    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

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
                        {type}
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
