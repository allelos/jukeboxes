import Image from "next/image";
import {
  PlayButton,
  PauseButton,
  SpeakerButton,
} from "@components/controls/buttons";
import styles from "@styles/controls.module.css";

const Controls = ({ play, pause, volume, isPlaying, source, children }) => (
  <div className={styles.container}>
    <div className={styles.station}>{children}</div>
    <div className={styles.controls}>
      <button
        aria-label={isPlaying ? "Pause" : "Start playing"}
        className={styles.playButton}
        onClick={isPlaying ? pause : play}
        disabled={!source}
      >
        {isPlaying ? <PauseButton /> : <PlayButton />}
      </button>
    </div>
    <div className={styles.volume}>
      <SpeakerButton />
      <input
        type="range"
        max="100"
        min="0"
        defaultValue="80"
        onChange={volume}
      />
    </div>
  </div>
);

export default Controls;
