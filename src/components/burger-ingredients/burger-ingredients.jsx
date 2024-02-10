import styles from "./burger-ingredients.module.css";
import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import Category from "../category/category";
import cn from "classnames";
import PropTypes from 'prop-types';


export default function BurgerIngredients(props) {
    // console.log(props);
    const { ingredients, setModal} = props;
//   console.log(ingredients);

  //возвращаем ключи типов ингредиентов
    const typeNames = Object.keys(ingredients).map((key) => {
    return key;
    });

    return (
    <>
        <BurgerIngredientsTabs typeNames={typeNames} />
        <div className={cn(styles.container, "custom-scroll")}>
            {/* Выводим список ингредиентов для каждой категории */}
            {typeNames.map((type) => (
                <div key={type}>
                    <h2 className={cn("text text_type_main-medium")}>{type}</h2>
                    <ul className={cn(styles.ingredients__list, "custom-scroll")}>
                        {/* Выводим ингредиенты для текущей категории */}
                        {ingredients[type].map((ingredient) => (
                            <li key={ingredient._id} className={cn(styles.category, 'mb-10')}>
                                <Category 
                                image={ingredient.image} 
                                price={ingredient.price} 
                                name={ingredient.name}
                                // _id={ingredient._id}
                                // onClick={() => setModal(true)}
                                onClick={() => setModal({ ...ingredient, showModal: true })}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.objectOf(
        PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
        )
    ).isRequired,
    setModal: PropTypes.func.isRequired,
};