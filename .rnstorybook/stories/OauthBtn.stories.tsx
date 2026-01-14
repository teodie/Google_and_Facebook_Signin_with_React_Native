import type { Meta, StoryObj } from '@storybook/react-native';
import OauthBtn from './OauthBtn';
import { View } from 'react-native';
import { fn } from 'storybook/test';

export default {
  title: 'Button',
  component: OauthBtn,
  decorators: [
    (Story) => (
      <View className=' flex-1'>
        <Story />
      </View>
    ),
  ],
  args: { onPress: fn() },
} satisfies Meta<typeof OauthBtn>;


export const Google: StoryObj = {
  args: {
    provider: "Google",
    bgColor: "bg-white",
    txtColor: "text-gray-400"
  },
};

export const Facebook: StoryObj = {
  args: {
    provider: "Facebook",
    bgColor: "bg-[#3D5A98]",
    txtColor: "text-red"
  },
};