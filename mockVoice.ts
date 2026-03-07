// ==============================================
// Mock Voice サービス
// v0.0.1 ではダミー実装。将来 TTS / STT を差し込む。
// ==============================================

export interface VoiceService {
  /** テキストを音声で読み上げる（Mock: console.logのみ） */
  speak(text: string): Promise<void>;
  /** 音声録音を開始する（Mock: 何もしない） */
  startRecording(): Promise<void>;
  /** 音声録音を停止しテキストを返す（Mock: ダミーテキスト） */
  stopRecording(): Promise<string>;
  /** 録音中かどうか */
  isRecording(): boolean;
}

export function createMockVoiceService(): VoiceService {
  let recording = false;

  return {
    async speak(text: string) {
      console.log('%c[Voice] Speaking: ' + text.slice(0, 50) + '...', 'color:#2d6a4f;font-weight:bold');
      // 将来: Web Speech API or 外部 TTS
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
