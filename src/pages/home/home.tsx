import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import styles from './home.module.css';
import cn from "classnames";

interface IHomePageProps {
    setIngredientDetailsModal: React.Dispatch<React.SetStateAction<null>>;
    setOrderDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<IHomePageProps> = ({ setIngredientDetailsModal, setOrderDetailsModal }) => {
    return (
        <main className={styles.content}>
            <div className={styles.container}>
                <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
                <BurgerIngredients setModal={setIngredientDetailsModal} />
            </div>
            <div className={cn(styles.container, 'mt-25')}>
                <BurgerConstructor setModal={setOrderDetailsModal} />
            </div>
        </main>
    );
};

export default HomePage;