import styles from "./category.module.css";
import { data } from "../../utils/data";
import cn from "classnames";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


export default function Category() {

    // console.log(data);
    return(
        <div className={styles.category}>
            <article  className={cn(styles.card, 'text text_type_main-medium mt-10')}>
                <Counter count={1} size="default" extraClass="m-1" />
                <div className={styles.item}>
                    <div className={styles.item_img}>
                        <img src={data[0].image} alt="burger" />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.price}>
                            <p className={cn('text text_type_digits-default pr-1')}>{data[0].price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <h3 className={cn('text text_type_main-small')}>{data[0].name}</h3>
                    </div>
                </div>
            </article>
        </div>
    )
}