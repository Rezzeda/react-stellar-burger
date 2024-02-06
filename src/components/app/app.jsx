import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import { useEffect, useState } from "react";
import cn from "classnames";
import OrderDetails from "../order-details/order-details";



export default function App() {
  
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    getIngredients()
    .then(res => {
      try {
        if (res.success){
          setIngredients(res.data);
          // console.log(res.data);
        }
      } catch(error){
        console.error(`Ошибка при выгрузке с сервера: ${error}`);
      }
    });
    }, []);
  
    // const { type } = data[0];
    // console.log(type);

    //сортировка ингредиентов по типу
    const ingredientTypes = ingredients.reduce((result, ingredient) => {
      if (!result[ingredient.type]) {
        result[ingredient.type] = [];
      }
      result[ingredient.type].push(ingredient);
      return result;
    }, {});
    // console.log(ingredientTypes);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.container}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <BurgerIngredients ingredients={ingredientTypes} />
        </div>
        <div className={cn(styles.container, 'mt-25')}>
          <BurgerConstructor  setModal={setOrderDetailsModal}/>
        </div>
      </main>
      <OrderDetails modal={orderDetailsModal} setModal={setOrderDetailsModal}/>
    </div>
  );
}


