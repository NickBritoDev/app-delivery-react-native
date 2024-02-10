import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
    title: string;
    cartQuantityItems?: number;
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
    return (
        <View className="flex-row items-center border-b-2 border-gray-50 pb-2 pt-3 mx-5">
            <View className="flex-1">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
                <Text className="text-white mt-2 text-xl font-heading">{title}</Text>
            </View>

            {cartQuantityItems > 0 &&
                <Link href={'/cart/yourCart'} asChild>
                    <TouchableOpacity activeOpacity={0.7} className="relative">
                        <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center  top-2 z-10 -right-3.5">
                            <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
                        </View>

                        <Feather name="shopping-bag" color={colors.white} size={24} />
                    </TouchableOpacity>
                </Link>
            }

        </View>
    )
}
