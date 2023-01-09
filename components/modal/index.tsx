import type { FC, ReactNode } from "react";
import modalStyles from "@styles/modal.module.css";

type Props = {
  children?: ReactNode;
  onToggle: () => void;
};

const Modal: FC<Props> = ({ children, onToggle }) => {
  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.content}>
        <button
          aria-label="close modal"
          className={modalStyles.closeButton}
          onClick={onToggle}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
