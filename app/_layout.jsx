import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { useSegments } from "expo-router";

export default function Layout() {
  const backgroundMusic = useRef(null);

  useEffect(() => {
    const playBackgroundMusic = async () => {
      if (!backgroundMusic.current) {
        const { sound } = await Audio.Sound.createAsync (
          require("../assets/background-music.mp3") // Replace with your audio file path
        );
        backgroundMusic.current = sound;
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish && !status.isLooping) {
            sound.replayAsync();
          }
        });
      }
    };

    playBackgroundMusic();

    return () => {
      if (backgroundMusic.current) {
        backgroundMusic.current.unloadAsync();
        backgroundMusic.current = null;
      }
    };
  }, []);

  const segments = useSegments();
  const excludedScreens = ["index", "login", "register"];
  const currentPath = segments[segments.length - 1];

  if (excludedScreens.includes(currentPath) && backgroundMusic.current) {
    backgroundMusic.current.stopAsync();
  } else if (!excludedScreens.includes(currentPath)) {
    backgroundMusic.current?.playAsync();
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="userPick" options={{ headerShown: false }} />
      <Stack.Screen name="win" options={{ headerShown: false }} />
      <Stack.Screen name="draw" options={{ headerShown: false }} />
      <Stack.Screen name="lose" options={{ headerShown: false }} />
    </Stack>
  );
}
