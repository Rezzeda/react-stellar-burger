import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {  useState } from "react";
import cn from "classnames";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [ingredientDetailsModal, setIngredientDetailsModal] = useState(null);

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={styles.content}>
        <div className={styles.container}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <BurgerIngredients setModal={setIngredientDetailsModal}/>
        </div>
        <div className={cn(styles.container, 'mt-25')}>
          <BurgerConstructor setModal={setOrderDetailsModal} />
        </div>
      </main>
      </DndProvider>
      {orderDetailsModal && (
        <Modal title={""} onClose={() => setOrderDetailsModal(false)} style={{ width: "720px", height: "718px" }}
        >
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal onClose={() => setIngredientDetailsModal(null)} title={'Детали ингредиента'} style={{ width: '720px', height: '538px' }}>
          <IngredientDetails selectedIngredient={ingredientDetailsModal} />
        </Modal>
      )}
    </div>
  );
}