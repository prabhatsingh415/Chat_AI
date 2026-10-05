import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  return { isConnected };
};

export default useNetworkStatus;
