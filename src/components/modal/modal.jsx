import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useEffect } from "react";
import cn from "classnames";
import PropTypes from 'prop-types';


export default function Modal({ title, children, onClose, style }) {

    const modals = document.getElementById('modals');

    useEffect(() => {
        const keydownHandler = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [onClose]);

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

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    style: PropTypes.object,
};