import { SafeAreaView } from "react-native-safe-area-context";
import ChatScreen from "../../components/ChatScreen";
import "../../global.css";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 mx-2 border-t border-zinc-800">
      <ChatScreen />
    </SafeAreaView>
  );
}
