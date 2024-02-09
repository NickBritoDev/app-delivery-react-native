import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { Inter_700Bold, Inter_400Regular, Inter_600SemiBold, Inter_500Medium, useFonts } from '@expo-google-fonts/inter'
import { Loading } from "@/components/loading";

export default function _layout() {
    const [fontsLoaded]=useFonts({ Inter_700Bold, Inter_400Regular, Inter_600SemiBold, Inter_500Medium })

    if(!fontsLoaded){
        return <Loading/>
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-900 pt-8">
            <Slot />
        </SafeAreaView>
    )
}
