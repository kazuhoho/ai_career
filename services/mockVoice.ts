import type { VoiceService } from '@/services/interfaces';

export function createMockVoiceService(): VoiceService {
  let recording = false;

  return {
    async speak(text: string) {
      console.log('%c[Voice] Speaking: ' + text.slice(0, 50) + '...', 'color:#2d6a4f;font-weight:bold');
    },
    async startRecording() {
      recording = true;
      console.log('%c[Voice] Recording started (mock)', 'color:#2d6a4f;font-weight:bold');
    },
    async stopRecording() {
      recording = false;
      console.log('%c[Voice] Recording stopped (mock)', 'color:#2d6a4f;font-weight:bold');
      return '（音声入力のモック結果）';
    },
    isRecording() {
      return recording;
    },
  };
}
