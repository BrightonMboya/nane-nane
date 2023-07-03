import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "nane_nane",
  slug: "nane_nane",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logo.jpeg",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/logo.jpeg",
    resizeMode: "contain",
    backgroundColor: "#f6f6f6",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    package: "com.mboya.nane_nane",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/logo.jpeg",
      backgroundColor: "#f6f6f6",
    },
  },
  extra: {
    eas: {
      "projectId": "fe627e60-92a5-4ddd-a3b2-93ae82d43d2f"
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
