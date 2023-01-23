import { createPortal } from "react-dom";
import { useState } from "react";
import dynamic from "next/dynamic";
import Form from "@components/stationRequest/form";
import Completion from "@components/stationRequest/completion";
import styles from "@styles/stationRequest.module.css";

const Modal = dynamic(() => import("@components/modal"), { ssr: false });

const stepMap = {
  request: Form,
  completion: Completion,
};

const StationRequest = () => {
  const [step, setStep] = useState("request");
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((p) => !p);
    setStep("request");
  };

  // @ts-ignore
  const Step = stepMap[step];

  return (
    <>
      <span className={styles.requestStation} onClick={onToggle}>
        Request a new station?
      </span>
      {open &&
        createPortal(
          <Modal onToggle={onToggle}>
            <Step onSuccess={setStep} />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default StationRequest;
