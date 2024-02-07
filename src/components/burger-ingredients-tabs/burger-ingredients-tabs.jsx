import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import React from 'react'

export default function BurgerIngredientsTabs({typeNames}) {
    // console.log(props.typeNames[0]);
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