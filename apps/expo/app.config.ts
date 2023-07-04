import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "nane-nane",
  slug: "nane-nane",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
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
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#f6f6f6",
    },
  },
  extra: {
    eas: {
      "projectId": "478d896b-e83d-4301-9564-e9ba9db63786"

    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
