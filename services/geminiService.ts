import { GoogleGenAI, Modality } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Singleton AudioContext
let sharedAudioContext: AudioContext | null = null;

export const getAudioContext = (): AudioContext => {
  if (!sharedAudioContext) {
    // Cross-browser support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass();
  }
  return sharedAudioContext;
};

// CRITICAL IOS FIX:
// Play a silent sound to forcefully wake up the audio engine.
// Simply calling resume() is sometimes not enough on WebKit if followed by async work.
export const wakeUpAudioContext = async () => {
  const ctx = getAudioContext();
  
  // Always try to resume
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (e) {
      console.error("Context resume failed", e);
    }
  }

  // Play a tiny bit of silence
  // This creates a rigid "running" state for the audio context
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch (e) {
    console.error("Silent buffer playback failed", e);
  }
};

// Helpers for Audio Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  dataSampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // Ensure we have an even number of bytes for 16-bit PCM
  let bufferToUse = data.buffer;
  if (data.byteLength % 2 !== 0) {
     console.warn("Odd byte length for 16-bit PCM, trimming last byte");
     bufferToUse = data.buffer.slice(0, data.byteLength - 1);
  }

  const dataInt16 = new Int16Array(bufferToUse);
  const frameCount = dataInt16.length / numChannels;
  
  const buffer = ctx.createBuffer(numChannels, frameCount, dataSampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Main TTS Function
export const playPronunciation = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say carefully: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio data received from Gemini.");
    }

    const ctx = getAudioContext();
    const outputNode = ctx.createGain();
    outputNode.connect(ctx.destination);

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      ctx,
      24000,
      1,
    );

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    source.start();

  } catch (error) {
    console.error("Error generating speech:", error);
    throw error;
  }
};