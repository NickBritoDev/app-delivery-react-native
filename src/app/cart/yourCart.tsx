import { Button } from "@/components/button";
import { Header } from "@/components/header";
import Input from "@/components/input";
import { LinkButton } from "@/components/linkButton";
import { Product } from "@/components/product";
import { ProductsCartProps, useCartStore } from "@/stores/cartStores";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "+5511945799235"

export default function Cart() {
  const navigation = useNavigation()
  const [adress, setAdress] = useState("")
  const cartStoreItems = useCartStore()

  const total = formatCurrency(cartStoreItems.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductsCartProps) {
    Alert.alert("Remover Item", `Deseja remover ${product.title} do seu carrinho ?`, [
      {
        text: "Cancelar",
        style: "destructive",
        onPress: () => { },
      },
      {
        text: "Sim",
        style: "default",
        onPress: () => {
          cartStoreItems.remove(product.id)
        }
      }
    ])
  }

  function handleOrder() {
    if (adress.trim().length === 0) {
      return Alert.alert('Ops...', "Informe os dados da entrega.")
    }

    const products = cartStoreItems.products.map((product) => `\n${product.quantity} ${product.title}`).join('')

    const message = `
    🍔 NOVO PEDIDO 🍟\n
    🏠 Entregar em:${adress}\n

    ITEMS DO PEDIDO:
    ${products}

    💲 Total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStoreItems.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />


      {cartStoreItems.products.length > 0 ? (
        <ScrollView>
          <View className="p-5 flex-1 border-b border-slate-400">
            {cartStoreItems.products.map((product) => (
              <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
            ))
            }
          </View>
        </ScrollView>
      ) : (
        <Text className="font-body text-slate-400 text-center my-8">Seu carrinho não contem items.</Text>
      )}

      {/* <KeyboardAwareScrollView> */}
      <View className="flex-row gap-2 items-center mt-5 mb-4 px-5">
        <Text className="text-white text-xl font-subtitle uppercase">Total</Text>
        <Text className="font-heading text-2xl text-lime-400">{total}</Text>
      </View>

      <View className="px-5 h-32">
        <Input
        // blurOnSubmit={true} onSubmitEditing={handleOrder} returnKeyType="next"
        onChangeText={setAdress} placeholder="Informe: Endereço, rua, bairro, cep, numero e complemento." />
      </View>
      {/* </KeyboardAwareScrollView> */}

      <View className="px-5 mb-2 gap-4 py-4">
        <Button onPress={handleOrder}>
          <Button.Text>
            Enviar Pedido
          </Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao Cardápio" />
      </View>

    </View>
  )
}
