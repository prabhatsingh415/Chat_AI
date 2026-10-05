const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.blockList = [
  /.*[\\\/](\.cxx|hermes-engine[\\\/]build|ReactAndroid[\\\/]build|android[\\\/]app[\\\/]build)[\\\/].*/,
];

module.exports = withNativeWind(config, { input: "./global.css" });
