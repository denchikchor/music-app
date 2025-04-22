import React, { useEffect, useRef } from 'react';
import styles from './AudioVisualizer.module.css';

interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioVisualizer: React.FC<Props> = ({ audioRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const initializedRef = useRef(false);

  const initAudioContext = () => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas || initializedRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaElementSource(audio);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;

      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      sourceRef.current = source;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvasCtx = canvas.getContext('2d')!;
      const width = canvas.width;
      const height = canvas.height;

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = '#111';
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#00e0ff';
        canvasCtx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
          x += sliceWidth;
        }

        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
      };

      draw();
      initializedRef.current = true;
    } catch (err) {
      console.warn('🎧 Visualizer init error:', err);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      if (!initializedRef.current) {
        initAudioContext();
      } else if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    audio.addEventListener('play', handlePlay);
    return () => {
      audio.removeEventListener('play', handlePlay);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [audioRef]);

  return <canvas ref={canvasRef} width={400} height={80} className={styles.canvas} />;
};

export default AudioVisualizer;
