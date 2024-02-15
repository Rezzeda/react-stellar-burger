import styles from "./burger-ingredients-tabs.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from "classnames";
import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCategory } from "../../services/categoriesSlice";


// export default function BurgerIngredientsTabs({typeNames}) {

//     const [current, setCurrent] = React.useState(typeNames[0]);

//     return (
//         <div className={cn(styles.tabs, 'mb-10')}>
//             {typeNames.map((type) => (
//             <Tab
//                 key={type}
//                 value={type}
//                 active={current === type}
//                 onClick={setCurrent}
//             >
//                 {type}
//             </Tab>
//             ))}
//         </div>
//     )
// }

export default function BurgerIngredientsTabs({ typeNames, setCurrentTab }) {
    const [current, setCurrent] = React.useState(typeNames[0]);

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
                    {type}
                </Tab>
            ))}
        </div>
    );
}

BurgerIngredientsTabs.propTypes = {
    typeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};