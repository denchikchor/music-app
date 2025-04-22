let activeAudio: HTMLAudioElement | null = null;

export function playSingleAudio(audio: HTMLAudioElement) {
  if (activeAudio && activeAudio !== audio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }

  activeAudio = audio;
  audio.play();
}

export function resetActiveAudio(audio: HTMLAudioElement) {
  if (activeAudio === audio) {
    activeAudio = null;
  }
}
