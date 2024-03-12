import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import PropTypes from 'prop-types';
import { typeToTitle } from "../../utils/constants";


export default function BurgerIngredientsTabs({ typeNames, currentTab, onTabChange }) {
    
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

BurgerIngredientsTabs.propTypes = {
    typeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
};