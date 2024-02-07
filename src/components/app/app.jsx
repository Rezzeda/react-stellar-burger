import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import { useEffect, useState } from "react";
import cn from "classnames";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";



export default function App() {
  
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [ingredientDetailsModal, setIngredientDetailsModal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    getIngredients()
    .then(res => {
      try {
        if (res.success){
          setIngredients(res.data);
        }
      } catch(error){
        console.error(`Ошибка при выгрузке с сервера: ${error}`);
      }
    });
    }, []);

    //сортировка ингредиентов по типу
    const ingredientTypes = ingredients.reduce((result, ingredient) => {
      if (!result[ingredient.type]) {
        result[ingredient.type] = [];
      }
      result[ingredient.type].push(ingredient);
      return result;
    }, {});

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.container}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <BurgerIngredients ingredients={ingredientTypes} setModal={setIngredientDetailsModal} />
        </div>
        <div className={cn(styles.container, 'mt-25')}>
          <BurgerConstructor setModal={setOrderDetailsModal} />
        </div>
      </main>
      <OrderDetails modal={orderDetailsModal} setModal={setOrderDetailsModal}/>
      <IngredientDetails
      ingredients={ingredients}
      modal={ingredientDetailsModal.showModal}
      setModal={setIngredientDetailsModal}
      selectedIngredient={ingredientDetailsModal}
      />
    </div>
  );
}


