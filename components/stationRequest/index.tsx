import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "@components/modal";
import Input from "@components/input";
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
              <label>
                Request a new station that you would like to add to the list
                <input
                  autoComplete="off"
                  name="stationName"
                  type="text"
                  placeholder="Station name..."
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              {error && <span>Κάτι πήγε στραβά...</span>}
            </form>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default StationRequest;
