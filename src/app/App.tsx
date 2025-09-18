import "reflect-metadata";
import "../presentation/plugins";
import "@/application/container.register";
import * as React from "react";
import { RootStack } from "./routes";
import * as Sentry from '@sentry/react-native';
import * as SplashScreen from "expo-splash-screen";
import LoadingScreen from "@/presentation/screens/shared/components/Loading";
import { loading$ } from "@/presentation/plugins/loading";

SplashScreen.preventAutoHideAsync();

function App() {
  const [appReady, setAppReady] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const subscription = loading$.subscribe(setLoading);
    const timer = setTimeout(() => {
      setAppReady(true);
      SplashScreen.hideAsync();
    }, 1200);
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (!appReady) return null;

  return (
    <>
      <RootStack />
      {loading && <LoadingScreen />}
    </>
  );
}

export default Sentry.wrap(App);

