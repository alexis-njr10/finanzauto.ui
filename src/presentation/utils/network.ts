import NetInfo from '@react-native-community/netinfo';

export const checkConnection = (callback: (isOnline: boolean) => void) => {
  NetInfo.fetch().then(state => {
    const isOnline = !!(state.isConnected && state.isInternetReachable);
    callback(isOnline);
  });
};