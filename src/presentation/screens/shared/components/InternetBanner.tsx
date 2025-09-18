import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BannerType = 'offline' | 'online';

interface InternetBannerProps {
  type: BannerType;
  stylesBanner?: any;
}

const InternetBannerScreen = ({ type, stylesBanner }: InternetBannerProps) => {
  const backgroundColor = type === 'offline' ? '#d32f2f' : '#388e3c';
  const message = type === 'offline' ? 'Sin conexión a internet' : 'Estás en línea';

  return (
    <View style={[styles.banner, { backgroundColor }, stylesBanner]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  text: {
    fontFamily: 'Neo Sans Std',
    color: '#fff',
    fontWeight: '600',
  },
});

export default InternetBannerScreen;