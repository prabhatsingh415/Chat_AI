import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";

const useAudio = (onPermissionDenied?: () => void) => {
  const [recognizing, setRecognizing] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  useSpeechRecognitionEvent("start", () => {
    console.log("Speech started");
    setRecognizing(true);
  });

  useSpeechRecognitionEvent("end", () => {
    console.log("Speech ended");
    setRecognizing(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    console.log("RESULT:", event);

    const text = event.results[0]?.transcript?.trim() ?? "";

    if (!text) return;

    setTranscript(text);
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleStart = async (): Promise<boolean> => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    if (!result.granted) {
      onPermissionDenied?.();
      return false;
    }

    setTranscript("");

    ExpoSpeechRecognitionModule.start({
      lang: "en-IN",
      interimResults: true,
      continuous: false,
      maxAlternatives: 1,
    });

    return true;
  };

  const handleStop = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return {
    recognizing,
    transcript,
    setTranscript,
    handleStart,
    handleStop,
  };
};

export default useAudio;
