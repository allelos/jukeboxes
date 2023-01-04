import Image from "next/image";
import { PlayButton, PauseButton } from "@components/controls/buttons";
import StationSelector from "@components/selector";
import styles from "@styles/controls.module.css";

const Controls = ({
  play,
  pause,
  isPlaying,
  name,
  imgSrc,
  genre = "Electronic",
  onSelect,
}) => (
  <div className={styles.container}>
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
      {name && (
        <div className={styles.header}>
          <h2>{name}</h2>
          <h4>{genre}</h4>
        </div>
      )}
    </div>
    <div className={styles.controls}>
      <button className={styles.playButton} onClick={isPlaying ? pause : play} disabled={!name}>
        {isPlaying ? <PauseButton /> : <PlayButton />}
      </button>
    </div>
    <div className={styles.stationSelector}>
      <StationSelector onSelect={onSelect} />
    </div>
  </div>
);

export default Controls;
