import LottieView from "lottie-react-native";
import { CornerDownLeft, Mic, Square, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import useAudio from "../hook/useAudio";
import useTimer from "../hook/useTimer";
import AppText from "./AppText";
import RequestPopUp from "./RequestPopUp";

interface InputProps {
  onSend: (prompt: string) => Promise<string>;
  isConnected: boolean;

  onOffline: () => void;
}
const Input = ({ onSend, isConnected, onOffline }: InputProps) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [_, setError] = useState<string>("");
  const [showPermissionPopup, setShowPermissionPopup] =
    useState<boolean>(false);

  const { recognizing, transcript, setTranscript, handleStart, handleStop } =
    useAudio(() => {
      setShowPermissionPopup(true);
    });

  const { seconds, start, stop, reset } = useTimer(() => {
    handleStop();
    setIsSpeaking(false);
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const hasTranscript = transcript.trim().length > 0;

  useEffect(() => {
    if (!recognizing && isSpeaking) {
      stop();
      setIsSpeaking(false);
    }
  }, [recognizing]);

  useEffect(() => {
    if (!isConnected) {
      if (isSpeaking) {
        handleStop();
        reset();
        setIsSpeaking(false);
      }
    }
  }, [isConnected]);

  // Scroll to bottom when transcript changes
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    });
  }, [transcript]);

  const handleSend = async () => {
    if (!isConnected) {
      onOffline();
      return;
    }

    if (!hasTranscript || isSpeaking) {
      return;
    }

    const prompt = transcript.trim();

    console.log("Sending:", prompt);

    setTranscript("");
    reset();
    setIsSpeaking(false);

    try {
      await onSend(prompt);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Failed to send message:", error);
    }
  };

  const handleStartRecording = async () => {
    if (!isConnected) {
      onOffline();
      return;
    }

    reset();
    setTranscript("");

    const started = await handleStart();

    if (!started) {
      return;
    }

    setIsSpeaking(true);
    start();
  };

  const handleCancel = () => {
    reset();
    handleStop();
    setTranscript("");
    setIsSpeaking(false);
  };

  const showTranscriptBox = isSpeaking || hasTranscript;

  return (
    <View className="w-full px-0 pb-0">
      {showPermissionPopup && (
        <RequestPopUp setShowPermissionPopup={setShowPermissionPopup} />
      )}
      {showTranscriptBox ? (
        <View className="w-full h-[208px] bg-[#090B10] rounded-t-[32px] px-6 pt-5 pb-3">
          {isSpeaking ? (
            <View className="flex-row justify-between items-start">
              <View>
                <AppText className="text-white text-base font-inter-semibold">
                  Listening...
                </AppText>

                <AppText className="text-gray-400 text-xs mt-1">
                  0:{seconds.toString().padStart(2, "0")} · Tap to finish
                </AppText>
              </View>

              <View className="items-center justify-center w-[140px] h-[45px]">
                <LottieView
                  source={require("../assets/animations/Sound Waves.json")}
                  autoPlay
                  loop
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
            </View>
          ) : (
            <View className="items-center">
              <AppText className="text-gray-400 text-sm">
                Review your prompt before sending.
              </AppText>
            </View>
          )}

          <View className="flex-row flex-1 items-center gap-3 mt-3">
            {/* Transcript */}
            <View className="flex-1 h-[110px] border-2 border-[#5B6CFF] rounded-2xl px-4 py-3">
              <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-start",
                }}
              >
                <AppText className="text-white text-base leading-6">
                  {transcript}
                </AppText>
              </ScrollView>
            </View>

            <Pressable
              onPress={handleCancel}
              className={`w-14 h-14 rounded-full ${
                isSpeaking ? "bg-[#3848B8]" : "bg-[#171B24]"
              } justify-center items-center`}
            >
              {isSpeaking ? (
                <Square size={18} strokeWidth={4} color="white" />
              ) : (
                <X size={22} strokeWidth={3} color="white" />
              )}
            </Pressable>

            {/* Send */}
            <Pressable
              disabled={!hasTranscript || isSpeaking}
              onPress={handleSend}
              className={`w-14 h-14 rounded-full border border-zinc-700 justify-center items-center ${
                hasTranscript && !isSpeaking
                  ? "bg-[#171B24]"
                  : "bg-[#171B24] opacity-40"
              }`}
            >
              <CornerDownLeft size={24} color="white" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="w-full h-[144px] bg-[#090B10] rounded-t-[32px] px-2 pt-5 pb-3">
          <AppText className="text-gray-400 text-sm text-center mb-6">
            Tap to speak. See your prompt before sending.
          </AppText>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-16 flex-row items-center gap-3 px-3 bg-[#171B24] border border-zinc-700 rounded-2xl">
              <Pressable
                onPress={handleStartRecording}
                className="w-10 h-10 rounded-full bg-[#3848B8] justify-center items-center"
              >
                <Mic size={22} color="white" />
              </Pressable>

              <AppText className="text-gray-400 text-base">
                Tap to speak
              </AppText>
            </View>

            <Pressable
              onPress={handleStartRecording}
              className="w-14 h-14 rounded-full bg-[#3848B8] justify-center items-center"
            >
              <Mic size={24} color="white" />
            </Pressable>

            <Pressable
              disabled
              className="w-14 h-14 rounded-full bg-[#171B24] border border-zinc-700 justify-center items-center opacity-40"
            >
              <CornerDownLeft size={24} color="white" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Input;
