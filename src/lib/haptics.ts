export function triggerHaptic(): void {
  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(25);
    }
  } catch {
    // Silently fail - haptics not supported
  }
}

export function isHapticsSupported(): boolean {
  return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
}

let clickSoundBuffer: AudioBuffer | null = null;
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioContext;
}

async function createClickSound(): Promise<AudioBuffer | null> {
  const ctx = getAudioContext();
  if (!ctx) return null;

  if (clickSoundBuffer) return clickSoundBuffer;

  // Generate a soft click sound
  const sampleRate = ctx.sampleRate;
  const duration = 0.05; // 50ms
  const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate;
    data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 80) * 0.3;
  }

  clickSoundBuffer = buffer;
  return buffer;
}

export async function playClickSound(): Promise<void> {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const buffer = await createClickSound();
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Silently fail
  }
}
