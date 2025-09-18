import { Text, Animated, Easing } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";

const LoadingScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={['#A2D033', '#166D6B']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={styles.loadingOverlay}
    >
      <Animated.Image
        source={require("@/presentation/assets/images/splash-icon.png")}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Espera mientras se cargan los recursos...</Text>
    </LinearGradient>
  );
};

export default LoadingScreen;

