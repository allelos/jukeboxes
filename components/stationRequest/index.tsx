import type { ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";
import Modal from "@components/modal";
import Input from "@components/input";
import styles from "@styles/stationRequest.module.css";

const makeOnChange =
  (fn: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
    fn(e.target.value);

const StationRequest = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [streamingUrl, setStreamingUrl] = useState("");
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
      .post("/api/station-request", { name, genre, streamingUrl })
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
              <h2>
                Request a new station that you would like to add to the list
              </h2>
              <Input
                name="stationName"
                type="text"
                placeholder="Station name..."
                onChange={makeOnChange(setName)}
                required
              >
                Station name
              </Input>
              <div className={styles.row}>
                <Input
                  name="stationGenre"
                  placeholder="Electronic"
                  onChange={makeOnChange(setGenre)}
                >
                  Genre / Category
                </Input>
                <Input
                  name="stationUrl"
                  placeholder="https://..."
                  onChange={makeOnChange(setStreamingUrl)}
                >
                  Streaming URL
                </Input>
              </div>
              <hr />
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
