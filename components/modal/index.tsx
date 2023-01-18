import type { FC, ReactNode } from "react";
import { Rubik } from "@next/font/google";
import modalStyles from "@styles/modal.module.css";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {
  children?: ReactNode;
  onToggle: () => void;
};

const Modal: FC<Props> = ({ children, onToggle }) => {
  return (
    <div className={`${modalStyles.container} ${rubik.className}`}>
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
