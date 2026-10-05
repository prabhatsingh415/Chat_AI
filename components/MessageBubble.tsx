import LottieView from "lottie-react-native";
import { Volume2, VolumeX } from "lucide-react-native";
import { Pressable, View } from "react-native";
import AppText from "./AppText";

interface MessageBubbleProps {
  message: string;
  author: "user" | "model";
  speaking?: boolean;
  onSpeak?: () => void;
}

const MessageBubble = ({
  message,
  author,
  speaking,
  onSpeak,
}: MessageBubbleProps) => {
  const isUser = author === "user";

  return (
    <View className={`w-full px-4 ${isUser ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[88%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-[#3848B8] rounded-br-md"
            : "bg-[#171B24] border border-zinc-800 rounded-bl-md"
        }`}
      >
        {message === "Thinking..." ? (
          <View className="flex-row gap-4 items-center">
            <AppText className="text-white text-base leading-6">
              {message}
            </AppText>

            <LottieView
              source={require("../assets/animations/thinking.json")}
              autoPlay
              loop
              style={{
                width: 30,
                height: 30,
                marginLeft: -4,
              }}
            />
          </View>
        ) : (
          <AppText className="text-white text-base leading-6">
            {message}
          </AppText>
        )}
      </View>

      <View
        className={`flex-row items-center mt-1 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isUser && onSpeak && (
          <Pressable
            onPress={onSpeak}
            className={`mr-2 p-2 rounded-full ${
              speaking ? "bg-[#3848B8]" : "bg-transparent"
            }`}
          >
            {speaking ? (
              <VolumeX size={18} color="white" />
            ) : (
              <Volume2 size={18} color="#9CA3AF" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default MessageBubble;
