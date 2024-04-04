import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import { typeToTitle } from "../../utils/constants";

interface IBurgerIngredientsTabs {
    typeNames: string[];
    currentTab: number;
    onTabChange: (index: number) => void;
};

export const BurgerIngredientsTabs: React.FC<IBurgerIngredientsTabs> = ({ typeNames, currentTab, onTabChange }) => {
    return (
        <div className={cn(styles.tabs, 'mb-10')}>
            {typeNames.map((type, index) => (
                <Tab
                    key={type}
                    value={type}
                    active={index === currentTab}
                    onClick={() => onTabChange(index)}
                >
                    {typeToTitle[type] || type}
                </Tab>
            ))}
        </div>
    );
};

export default BurgerIngredientsTabs;