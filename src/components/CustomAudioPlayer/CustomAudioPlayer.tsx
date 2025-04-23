import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomAudioPlayer.module.css';
import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';

interface Props {
  src: string;
  onEndedNext?: () => void;
  isActive?: boolean;
  onTogglePlay?: () => void;
}

const CustomAudioPlayer: React.FC<Props> = ({ src, onEndedNext, isActive, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);

  const connectAudio = () => {
    if (!audioRef.current || isConnected) return;

    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;

    try {
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      sourceRef.current = source;
      analyserRef.current = analyser;
      audioContextRef.current = ctx;
      setIsConnected(true);

      drawWave();
    } catch (err) {
      console.warn('⚠️ MediaElementSource already created:', err);
    }
  };

  const drawWave = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ccc';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive) {
      if (!isConnected) {
        connectAudio();
      } else {
        drawWave();
      }

      audio.play().catch((err) => console.warn('Play error:', err));
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      onEndedNext?.();
    };
    

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEndedNext]);

  useEffect(() => {
    return () => {
      sourceRef.current?.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      setIsConnected(false);
    };
  }, []);

  return (
    <>
      {hasError ? (
        <div className={styles.errorMessage}>Audio file not found</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.controls}>
            <button onClick={onTogglePlay} className={styles.button}>
              {isActive ? (
                <PauseIcon className={styles.icon} />
              ) : (
                <PlayIcon className={styles.icon}  />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                const audio = audioRef.current;
                if (audio) audio.currentTime = Number(e.target.value);
              }}
              className={styles.slider}
            />
            <span className={styles.timer}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className={`${styles.canvasWrapper} ${!isActive ? styles.hiddenCanvas : ''}`}>
            <canvas ref={canvasRef} width={500} height={100} className={styles.canvas} />
          </div>

          <audio
            ref={audioRef}
            src={src}
            crossOrigin="anonymous"
            className="hidden"
            onError={() => {
              setHasError(true);
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomAudioPlayer;
