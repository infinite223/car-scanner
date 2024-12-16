import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        animation: "none",
      }}
    >
      <Stack.Screen name="settings" options={{}} />
      <Stack.Screen name="incompatibility" options={{}} />
      <Stack.Screen name="car-info" options={{}} />
    </Stack>
  );
}
