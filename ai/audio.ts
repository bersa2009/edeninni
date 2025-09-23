// Lightweight audio recording stub. Replace with expo-av or similar.
let isRecording = false;

export async function startRecording(): Promise<void> {
  // In real app: request permissions and start mic with expo-av Audio.Recording
  isRecording = true;
  await new Promise((r) => setTimeout(r, 200));
}

export async function stopRecording(): Promise<string> {
  if (!isRecording) {
    return '/tmp/cry_2025-09-23.wav';
  }
  isRecording = false;
  await new Promise((r) => setTimeout(r, 300));
  // Return temporary wav path
  return '/tmp/cry_2025-09-23.wav';
}

