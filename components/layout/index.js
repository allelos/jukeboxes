import { useState, useRef } from "react";
import Controls from "@components/controls";
import Player from "@components/player";
import Visualization from "@components/visualization";
import styles from "@styles/interface.module.css";

const sources = {
  best: {
    src: "//best.live24.gr/best1222",
    imgSrc: "/stations/best926.jpg",
    name: "Best 92.6",
  },
  enLefko: {
    src: "https://stream.radiojar.com/srzwv225e3quv?_=801191",
    imgSrc: "/stations/enLefko.png",
    name: "En Lefko 87.7"
  },
  imagine: {
    src: "//imagine897.radioca.st/stream",
    imgSrc: "/stations/imagine897.png",
    name: "Imagine 89.7",
    genre: "Eclectic"
  },
  zucca: {
    src: "https://stream.zuccaradio.com/stream",
    imgSrc: "/stations/zuccaRadio.jpg",
    name: "Zucca Radio",
  },
  athensUpRadio: {
    src: "http://n01.radiojar.com/9ndpdg3c0s8uv?rj-ttl=5&rj-tok=AAABhclBUNQAqGi0G3H_rMgxCQ",
    imgSrc: "/stations/athensUpRadio.jpg",
    name: "Athens Up Radio"
  }
};

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [source, setSource] = useState("");

  const audio = useRef();

  const play = () => {
    audio.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.current.pause();
    setIsPlaying(false);
  };

  const volume = (event) => {
    if (!audio.current) return
    const gain = event.target.value / 100
    audio.current.volume = gain
  }

  const selectSource = (value) => {
    setIsPlaying(false);
    setSource(value);
  };

  return (
    <div>
      <div className={styles.container}>
        <Controls
          play={play}
          pause={pause}
          volume={volume}
          isPlaying={isPlaying}
          onSelect={selectSource}
          {...sources[source]}
        />
      </div>
      {source && (
        <audio
          ref={audio}
          src={sources[source]?.src}
          crossOrigin="anonymous"
          // muted
        />
      )}
      {source && (
        <Player audio={audio} isPlaying={isPlaying}>
          {(audioData) => isPlaying && <Visualization audioData={audioData} />}
        </Player>
      )}
    </div>
  );
};

export default Layout;
