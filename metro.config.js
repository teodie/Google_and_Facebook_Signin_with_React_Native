// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configuration for NativeWind
const nativeWindConfig = withNativeWind(config, { input: './global.css' })
// Configuration for Storybook wrap the nativewind config & default config
module.exports = withStorybook(nativeWindConfig, {enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true"})
