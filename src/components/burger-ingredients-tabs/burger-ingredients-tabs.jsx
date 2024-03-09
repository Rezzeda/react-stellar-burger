import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { typeToTitle } from "../../utils/constants";


export default function BurgerIngredientsTabs({ typeNames, setCurrentTab }) {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (current === null && typeNames.length > 0) {
            setCurrent(typeNames[0]);
        }
    }, [current, typeNames]);

    // Передаем тип текущей вкладки в родительский компонент для прокрутки к соответствующему <h2>
    const handleClick = (type) => {
        setCurrent(type);
        setCurrentTab(type);
    };

    return (
        <div className={cn(styles.tabs, 'mb-10')}>
            {typeNames.map((type) => (
                <Tab
                    key={type}
                    value={type}
                    active={current === type}
                    onClick={() => handleClick(type)}
                >
                    {typeToTitle[type] || type}
                </Tab>
            ))}
        </div>
    );
}

BurgerIngredientsTabs.propTypes = {
    typeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
