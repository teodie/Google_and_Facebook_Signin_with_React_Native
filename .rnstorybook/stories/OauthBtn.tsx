import { View, Text, TouchableOpacity , } from 'react-native'

type OauthBtnProp = {
  provider: string,
  bgColor: string,
  txtColor: string,
  onPress: () => void
}

const OauthBtn = ( { provider, bgColor, txtColor } : OauthBtnProp) => {
  return (
    <TouchableOpacity className={`border border-gray-500 h-14 items-center justify-center rounded-full ${bgColor}`}>
      <Text className={`${txtColor}`}>{provider}</Text>
    </TouchableOpacity>
  )
}

export default OauthBtn