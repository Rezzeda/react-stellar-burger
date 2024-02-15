import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import { useEffect, useState } from "react";
import cn from "classnames";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { useDispatch } from "react-redux";



export default function App() {
  
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [ingredientDetailsModal, setIngredientDetailsModal] = useState(null);
  // const [ingredients, setIngredients] = useState([]);

//   useEffect(() => {
//     getIngredients()
//     .then(res => {
//         if (res.success) {
//             setIngredients(res.data);
//         } else {
//             console.error('Не удалось получить данные об ингредиентах');
//         }
//     })
//     .catch(error => {
//         console.error(`Ошибка при запросе к серверу: ${error}`);
//     });
// }, []);
// const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchIngredients());
//   }, [dispatch]);


  // //сортировка ингредиентов по типу
  // const ingredientTypes = ingredients.reduce((result, ingredient) => {
  //   if (!result[ingredient.type]) {
  //     result[ingredient.type] = [];
  //   }
  //   result[ingredient.type].push(ingredient);
  //   return result;
  // }, {});

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <div className={styles.container}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          {/* <BurgerIngredients ingredients={ingredientTypes} setModal={setIngredientDetailsModal} /> */}
          <BurgerIngredients setModal={setIngredientDetailsModal}/>

        </div>
        <div className={cn(styles.container, 'mt-25')}>
          <BurgerConstructor setModal={setOrderDetailsModal} />
        </div>
      </main>
      <Modal isVisible={orderDetailsModal} title={''} onClose={() => setOrderDetailsModal(false)} style={{ width: '720px', height: '718px' }}>
        <OrderDetails />
      </Modal>
      {ingredientDetailsModal && (
        <Modal isVisible={true} onClose={() => setIngredientDetailsModal(null)} title={'Детали ингредиента'} style={{ width: '720px', height: '538px' }}>
          <IngredientDetails selectedIngredient={ingredientDetailsModal} />
        </Modal>
      )}
    </div>
  );
}