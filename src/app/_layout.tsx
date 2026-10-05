import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { MessageCircleMore } from "lucide-react-native";
import AppText from "../../components/AppText";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: require("../../assets/fonts/Inter/static/Inter_18pt-Regular.ttf"),
    InterMedium: require("../../assets/fonts/Inter/static/Inter_18pt-Medium.ttf"),
    InterSemiBold: require("../../assets/fonts/Inter/static/Inter_18pt-SemiBold.ttf"),
    InterBold: require("../../assets/fonts/Inter/static/Inter_18pt-Bold.ttf"),
    InterItalic: require("../../assets/fonts/Inter/static/Inter_18pt-Italic.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const isHermes = () =>
    !!(globalThis as Record<string, unknown>).HermesInternal;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#040406",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Chat AI",
          headerTitleStyle: {
            fontFamily: fontsLoaded ? "InterBold" : undefined,
          },
          contentStyle: { backgroundColor: "#040406" },
          headerLeft: () => (
            <MessageCircleMore
              style={{ marginHorizontal: 12 }}
              color="#6273FF"
              size={28}
            />
          ),

          headerRight: () =>
            isHermes() && (
              <AppText className="text-white text-xs">
                ⚡ Hermes V1 Active • React Compiler
              </AppText>
            ),
        }}
      />
    </Stack>
  );
}
