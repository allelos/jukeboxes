import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "@components/modal";
import styles from "@styles/stationRequest.module.css";

const StationRequest = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((p) => !p);
  };

  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!name) return;
    if (loading) return;

    setLoading(true);
    axios
      .post("/api/station-request", { name })
      .then(() => {
        setError(null);
        onToggle();
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <span className={styles.requestStation} onClick={onToggle}>
        Request a new station?
      </span>
      {open &&
        createPortal(
          <Modal onToggle={onToggle}>
            <form className={styles.form} onSubmit={onSubmit}>
              <input
                autoComplete="off"
                name="stationName"
                type="text"
                placeholder="Station name"
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading
                  ? "Requesting a new station..."
                  : "Make a station request"}
              </button>
              {error && <span>Something went wrong...</span>}
            </form>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default StationRequest;
