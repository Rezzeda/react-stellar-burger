import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import React from 'react'
import PropTypes from 'prop-types';


export default function BurgerIngredientsTabs({typeNames}) {

    const [current, setCurrent] = React.useState(typeNames[0]);

    return (
        <div className={cn(styles.tabs, 'mb-10')}>
            {typeNames.map((type) => (
            <Tab
                key={type}
                value={type}
                active={current === type}
                onClick={setCurrent}
            >
                {type}
            </Tab>
            ))}
        </div>
    )
}

BurgerIngredientsTabs.propTypes = {
    typeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};