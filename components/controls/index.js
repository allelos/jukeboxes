import Image from "next/image";
import { PlayButton, PauseButton, SpeakerButton } from "@components/controls/buttons";
import StationSelector from "@components/selector";
import styles from "@styles/controls.module.css";

const Controls = ({
  play,
  pause,
  volume,
  isPlaying,
  name,
  imgSrc,
  genre = "Electronic",
  onSelect,
}) => (
  <div className={styles.container}>
    <div className={styles.station}>
    <StationSelector onSelect={onSelect} />
      {name && (
        <div className={styles.information}>
          {imgSrc && (
            <Image
              src={imgSrc}
              alt="Radio station logo"
              width={80}
              height={80}
              className={styles.image}
            />
          )}
          <div className={styles.header}>
            <h2>{name}</h2>
            <h4>{genre}</h4>
          </div>
        </div>
      )}
    </div>
    <div className={styles.controls}>
      <button
        aria-label={isPlaying ? "Pause" : "Start playing"}
        className={styles.playButton}
        onClick={isPlaying ? pause : play}
        disabled={!name}
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
