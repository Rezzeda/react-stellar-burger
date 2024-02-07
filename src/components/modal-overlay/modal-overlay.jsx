import styles from "./modal-overlay.module.css";
import cn from "classnames";


export default function ModalOverlay({onClose, children}) {

    return (
        <div className={cn(styles.modal)} onClick={onClose}>
        <div className={cn(styles.modalDialog)} onClick={e => e.stopPropagation()}>
            {children}
        </div>
        </div>
    )
}