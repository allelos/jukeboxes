import { type PropsWithChildren, ChangeEvent } from "react"
import { PlayButton, PauseButton, SpeakerButton } from "@components/controls/buttons"
import styles from "@styles/controls.module.css"

type ControlsProps = PropsWithChildren<{
  play: () => void
  pause: () => void
  volume: (event: ChangeEvent<HTMLInputElement>) => void
  isPlaying: boolean
  source?: string
}>

function Controls({ play, pause, volume, isPlaying, source, children }: ControlsProps) {
  return (
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
        <input type="range" max="100" min="0" defaultValue="80" onChange={volume} />
      </div>
    </div>
  )
}

export default Controls
