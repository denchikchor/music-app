import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './WaveformPlayer.module.css';

interface Props {
  id: string;
  src: string;
  onPlay: (wave: any) => void;
}

const WaveformPlayer: React.FC<Props> = ({ id, src, onPlay }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    waveRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ddd',
      progressColor: '#4f46e5',
      height: 64,
      barWidth: 2,
      barRadius: 2,
      responsive: true,
    });

    waveRef.current.load(src);

    return () => {
      waveRef.current?.destroy();
    };
  }, [src]);

  const togglePlay = () => {
    if (!waveRef.current) return;

    if (!waveRef.current.isPlaying()) {
      onPlay(waveRef.current);
    }

    waveRef.current.playPause();
  };

  return (
    <div className={styles.player} data-testid={`audio-player-${id}`}>
      <div ref={containerRef} className={styles.waveform}></div>
      <button onClick={togglePlay} className={styles.playButton} data-testid={`play-button-${id}`}>
        ▶️ / ⏸
      </button>
    </div>
  );
};

export default WaveformPlayer;
