// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
// const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("glb");
// module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = config;
