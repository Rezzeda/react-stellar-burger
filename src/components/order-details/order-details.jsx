import styles from "./order-details.module.css";
import Modal from "../modal/modal";
import cn from "classnames";
import doneIcon from '../../images/done.svg'
import PropTypes from 'prop-types';


export default function OrderDetails({ modal, setModal }) {
    return (
        <Modal isVisible={modal} onClose={() => setModal(false)} style={{ width: '720px', height: '718px' }}>
            <div className={styles.container}>
                <h2 className={cn('text text_type_digits-large mb-8', styles.title)}>034536</h2>
                <p className={cn('text text_type_main-medium')}>идентификатор заказа</p>
                <img className={cn(styles.image, 'mb-15 mt-15')} src={doneIcon} alt="Заказ оформлен"/>
                <p className={cn('text text_type_main-default mb-2')}>Ваш заказ начали готовить</p>
                <p className={cn(styles.text, 'text text_type_main-default text_color_inactive')}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}

OrderDetails.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
};