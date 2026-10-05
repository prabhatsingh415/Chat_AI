import LottieView from "lottie-react-native";
import { Pressable, View } from "react-native";
import AppText from "./AppText";

interface OfflinePopupProps {
  onClose: () => void;
}

const OfflinePopup = ({ onClose }: OfflinePopupProps) => {
  return (
    <View className="h-[60%] flex items-center absolute top-5 left-5 right-5 z-50 bg-[#171B24] border border-zinc-700 rounded-3xl p-5">
      <LottieView
        source={require("../assets/animations/no-internet.json")}
        autoPlay
        loop
        style={{ width: 220, height: 220 }}
      />

      <AppText className="text-white text-lg font-inter-semibold">
        No Internet Connection
      </AppText>

      <AppText className="text-gray-400 text-sm leading-5 mt-2">
        Please connect to the internet to use voice input and AI chat.
      </AppText>

      <Pressable
        onPress={onClose}
        className="self-end mt-5 px-5 py-3 rounded-xl bg-[#3848B8]"
      >
        <AppText className="text-white font-inter-semibold">Got it</AppText>
      </Pressable>
    </View>
  );
};

export default OfflinePopup;
