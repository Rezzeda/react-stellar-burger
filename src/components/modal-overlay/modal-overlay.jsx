import styles from "./modal-overlay.module.css";
import cn from "classnames";
import PropTypes from 'prop-types';


export default function ModalOverlay({onClose, children}) {

    return (
        <div className={cn(styles.modal_overlay)} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};