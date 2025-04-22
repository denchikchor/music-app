import WaveSurfer from 'wavesurfer.js';

export function createSafeWaveSurfer(options: ConstructorParameters<typeof WaveSurfer>[0]) {
  const instance = WaveSurfer.create(options);

  const originalDestroy = instance.destroy;

  instance.destroy = function () {
    try {
      originalDestroy.call(instance);
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        console.warn('🧯 AbortError suppressed');
        return;
      }
      throw err;
    }
  };

  return instance;
}
