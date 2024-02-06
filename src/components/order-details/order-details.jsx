import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import cn from "classnames";
import doneIcon from '../../images/done.png'


export default function OrderDetails({ modal, setModal }) {
    return (
        <Modal isVisible={modal} title={null} onClose={() => setModal(false)}>
            <div className={styles.container}>
                <h2 className={cn('text text_type_digits-large', styles.title)}>034536</h2>
                <p>идентификатор заказа</p>
                <img className={styles.image} src={doneIcon} alt="Заказ оформлен" />
                <p className="mb-2">Ваш заказ начали готовить</p>
                <p className={styles.text}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}
