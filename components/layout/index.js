import { useState, useRef } from "react";
import Controls from "@components/controls";
import Player from "@components/player";
import Visualization from "@components/visualization";
import styles from "@styles/interface.module.css";
import StationSelector from "@components/selector";
import StationRequest from "@components/stationRequest";
import StationInformation from "@components/stationInformation";

const Layout = ({ sources, sourcesById }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [source, setSource] = useState("");

  const audio = useRef();

  const play = () => {
    audio.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setError(true);
      });
  };

  const pause = () => {
    audio.current.pause();
    setIsPlaying(false);
  };

  const volume = (event) => {
    if (!audio.current) return;
    const gain = event.target.value / 100;
    audio.current.volume = gain;
  };

  const selectSource = (value) => {
    setIsPlaying(false);
    setSource(value);
    setError(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Controls
          play={play}
          pause={pause}
          volume={volume}
          isPlaying={isPlaying}
          source={source}
        >
          <StationRequest />
          <StationSelector onSelect={selectSource} sources={sources} />
          <StationInformation {...sourcesById[source]} error={error} />
        </Controls>
      </div>
      {source && (
        <audio
          ref={audio}
          src={sourcesById[source]?.streamingUrl}
          crossOrigin="anonymous"
        />
      )}
      {source && (
        <Player audio={audio} isPlaying={isPlaying}>
          {(audioData) => isPlaying && <Visualization audioData={audioData} />}
        </Player>
      )}
    </>
  );
};

export default Layout;
