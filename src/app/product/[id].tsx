import { Image, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/linkButton";
import { useCartStore } from '@/stores/cartStores'

export default function Product() {
    const cartStores = useCartStore()
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()

    const product = PRODUCTS.find((product) => product.id === id)

    function handleAddtoCart() {
        if (product) {
            cartStores.add(product)
            navigation.goBack()
        }
    }

    if (!product) {
        return <Redirect href={'/'} />
    }

    return (
        <View className="flex-1 -mt-8">
            <Image source={product.cover} resizeMode="cover" className="w-full h-60" />


            <View className="p-5 mt-8 flex-1">
                <Text className="text-white font-heading text-xl mb-2">{product.title}</Text>
                <Text className="text-lime-400 text-2xl font-heading">{formatCurrency(product.price)}</Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>

                {product.ingredients.map((ingredient, index) => (
                    <Text className="text-slate-400 font-body text-base leading-6" key={index}>
                        {"\u2022"}    {ingredient}
                    </Text>
                ))}
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddtoCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>
                    <Button.Text>Adicionar ao carrinho</Button.Text>
                </Button>

                <LinkButton href="/" title="Voltar ao cardápio" />
            </View>
        </View>
    )
}
