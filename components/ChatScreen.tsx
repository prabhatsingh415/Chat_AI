import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import useGeminiChat from "../hook/useGeminiChat";
import useNetworkStatus from "../hook/useNetworkStatus";
import useTTS from "../hook/useTTS";
import useMessagesStore from "../store/messagesStore";
import Input from "./Input";
import MessageBubble from "./MessageBubble";
import OfflinePopup from "./OfflinePopup";
import StartConvoScreen from "./StartConvoScreen";

const ChatScreen = () => {
  const { generateResponse, thinking, error } = useGeminiChat();
  const { speak, toggleSpeak, speaking } = useTTS();
  const messages = useMessagesStore((state) => state.messages);
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(
    null
  );
  const { isConnected } = useNetworkStatus();

  const [showOfflinePopup, setShowOfflinePopup] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 50);
  };

  const handleSend = async (prompt: string): Promise<string> => {
    const response = await generateResponse(prompt);

    if (response) {
      speak(response);
    }

    return response;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, thinking, error]);

  const hasMessages = messages.length > 0;

  return (
    <View className="flex-1 relative">
      {showOfflinePopup && (
        <OfflinePopup onClose={() => setShowOfflinePopup(false)} />
      )}
      {hasMessages ? (
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 220,
            gap: 18,
          }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.message}
              author={message.author}
              speaking={speakingMessageId === message.id && speaking}
              onSpeak={
                message.author === "model"
                  ? async () => {
                      const isCurrentMessageSpeaking =
                        speakingMessageId === message.id && speaking;

                      if (isCurrentMessageSpeaking) {
                        await toggleSpeak(message.message);
                        setSpeakingMessageId(null);
                        return;
                      }

                      setSpeakingMessageId(message.id);
                      await toggleSpeak(message.message);
                    }
                  : undefined
              }
            />
          ))}

          {thinking && <MessageBubble message="Thinking..." author="model" />}

          {error && <MessageBubble message={error} author="model" />}
        </ScrollView>
      ) : (
        <StartConvoScreen />
      )}
      <View className="absolute bottom-0 left-0 right-0">
        <Input
          onSend={handleSend}
          isConnected={isConnected}
          onOffline={() => setShowOfflinePopup(true)}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
