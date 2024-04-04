import styles from "./modal-overlay.module.css";
import cn from "classnames";

interface IModalOverlayProps {
    onClose: () => void;
    children: React.ReactNode;
  }
  
  const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose, children }) => {
    return (
      <div className={cn(styles.modal_overlay)} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  export default ModalOverlay;