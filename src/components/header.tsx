import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Header() {
  return (
    <View className="flex-row items-center border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image className="w-32 h-6" source={require("@/assets/logo.png")} />
      </View>

      <Text>Cardápio</Text>
    </View>
  );
}


