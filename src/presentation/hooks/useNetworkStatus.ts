import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [justConnected, setJustConnected] = useState(false);

  useEffect(() => {
    let lastConnected = true;
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = !!(state.isConnected && state.isInternetReachable);

      if (!lastConnected && connected) {
        setJustConnected(true);
        setTimeout(() => setJustConnected(false), 10000);
      }

      lastConnected = connected;
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected, justConnected };
};