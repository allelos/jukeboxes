import Image from "next/image";
import { PlayButton, PauseButton } from "@components/controls/buttons";
import styles from "@styles/controls.module.css";

const Controls = ({ play, pause, isPlaying, name, imgSrc }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2>{name}</h2>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt="Radio station logo"
          width={32}
          height={32}
          className={styles.image}
        />
      )}
    </div>
    <button className={styles.button} onClick={isPlaying ? pause : play}>
      {isPlaying ? <PauseButton /> : <PlayButton />}
    </button>
  </div>
);

export default Controls;
