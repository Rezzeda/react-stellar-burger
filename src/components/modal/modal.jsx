import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useEffect } from "react";
import cn from "classnames";

export default function Modal({ isVisible = false, title, children, onClose, style }) {
    const modals = document.getElementById('modals');

    useEffect(() => {
        const keydownHandler = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', keydownHandler);
            return () => {
                document.removeEventListener('keydown', keydownHandler);
            };
        }
    }, [isVisible, onClose]);

    if (!isVisible) {
        return null;
    }

    return createPortal(
        <div className={cn(styles.modal)}>
            <ModalOverlay onClose={onClose}>
                <div className={cn(styles.modal_container, 'p-10')} style={style}>
                    <div className={cn(styles.container)}>
                        <h2 className={cn('text text_type_main-large', styles.title)}>{title}</h2>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        </div>,
        modals
    );
}