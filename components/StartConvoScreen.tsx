import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

const StartConvoScreen = () => {
  return (
    <View className="flex-1 justify-center items-center mb-[60%]">
      <LottieView
        source={require("../assets/animations/chat.json")}
        autoPlay
        loop
        style={{ width: 220, height: 220 }}
      />

      <AppText className="text-[#3848B8] font-inter-bold text-lg">
        Speak to start a conversation
      </AppText>
    </View>
  );
};

export default StartConvoScreen;
