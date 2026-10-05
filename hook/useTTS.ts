import * as Speech from "expo-speech";
import { useCallback, useState } from "react";

const useTTS = () => {
  const [speaking, setSpeaking] = useState<boolean>(false);

  const speak = useCallback(async (text: string) => {
    const cleanText = text
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
      .trim();

    if (!cleanText) return;

    await Speech.stop();

    const voices = await Speech.getAvailableVoicesAsync();

    const indianVoice =
      voices.find(
        (voice) => voice.language === "en-IN" && voice.quality === "Enhanced"
      ) ?? voices.find((voice) => voice.language === "en-IN");

    setSpeaking(true);

    Speech.speak(cleanText, {
      language: "en-IN",
      voice: indianVoice?.identifier,
      rate: 1.0,
      pitch: 1.0,

      onDone: () => {
        setSpeaking(false);
      },

      onStopped: () => {
        setSpeaking(false);
      },

      onError: () => {
        setSpeaking(false);
      },
    });
  }, []);

  const toggleSpeak = useCallback(
    async (text: string) => {
      const isSpeaking = await Speech.isSpeakingAsync();

      if (isSpeaking) {
        await Speech.stop();
        setSpeaking(false);
        return;
      }

      await speak(text);
    },
    [speak]
  );

  const stop = useCallback(async () => {
    await Speech.stop();
    setSpeaking(false);
  }, []);

  return {
    speak,
    toggleSpeak,
    stop,
    speaking,
  };
};

export default useTTS;
