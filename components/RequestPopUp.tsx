import React from "react";
import { Linking, Pressable, View } from "react-native";
import AppText from "./AppText";

interface RequestPopUpProps {
  setShowPermissionPopup: (show: boolean) => void;
}

const RequestPopUp = ({ setShowPermissionPopup }: RequestPopUpProps) => {
  const handleOpenSettings = async () => {
    setShowPermissionPopup(false);
    await Linking.openSettings();
  };

  return (
    <View className="absolute bottom-[155px] left-5 right-5 z-50 bg-[#171B24] border border-zinc-700 rounded-3xl p-5">
      <AppText className="text-white text-lg font-inter-semibold">
        Microphone Permission Required
      </AppText>

      <AppText className="text-gray-400 text-sm leading-5 mt-2">
        Microphone permission is required to use voice input. Please enable it
        from your device Settings.
      </AppText>

      <View className="flex-row justify-end gap-3 mt-5">
        <Pressable
          onPress={() => setShowPermissionPopup(false)}
          className="px-4 py-3 rounded-xl bg-[#090B10]"
        >
          <AppText className="text-gray-300">Cancel</AppText>
        </Pressable>

        <Pressable
          onPress={handleOpenSettings}
          className="px-4 py-3 rounded-xl bg-[#3848B8]"
        >
          <AppText className="text-white font-inter-semibold">
            Open Settings
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default RequestPopUp;
